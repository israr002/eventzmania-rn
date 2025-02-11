import AddPhoto from "assets/images/icons/add-photo.svg";
import CameraSvg from "assets/images/icons/camera.svg";
import CloseSvg from "assets/images/icons/close.svg";
import GallerySvg from "assets/images/icons/gallery.svg";
import React, { useState } from "react";
import {
  Alert,
  Image,
  Modal,
  Platform,
  Text,
  TouchableOpacity,
  View
} from "react-native";
import * as ImagePicker from "react-native-image-picker";
import { PERMISSIONS } from "react-native-permissions";
import { Colors } from "styles/colors";
import { requestPermission } from "utils/permissionUtils";

import { styles } from "./styles";
import { ImageSelectorProps } from "./types";

const ImageSelector: React.FC<ImageSelectorProps> = ({
  imageData,
  setImageData
}) => {
  const [isModalVisible, setIsModalVisible] = useState(false);

  const options: ImagePicker.CameraOptions = {
    mediaType: "photo"
  };

  const onClose = () => {
    setIsModalVisible(false);
  };

  const openGallery = async () => {
    const isStoragePermitted = await requestPermission(
      Platform.OS === "ios"
        ? PERMISSIONS.IOS.PHOTO_LIBRARY
        : PERMISSIONS.ANDROID.READ_EXTERNAL_STORAGE
    );
    if (isStoragePermitted) {
      ImagePicker.launchImageLibrary(options, response => {
        if (response.didCancel) {
          Alert.alert("Information", "Operation Canceled");
          return;
        } else if (response.errorCode === "camera_unavailable") {
          Alert.alert("Information", "Camera not available on device");
          return;
        } else if (response.errorCode === "permission") {
          Alert.alert("Information", "Permission not satisfied");
          return;
        } else if (response.errorCode === "others") {
          Alert.alert("Information", response.errorMessage);
          return;
        }
        if (response.assets && response.assets[0]) {
          setImageData(response.assets[0]);
        }
      });
    }
    setIsModalVisible(false);
  };

  const openCamera = async () => {
    const isCameraPermitted = await requestPermission(
      Platform.OS === "ios"
        ? PERMISSIONS.IOS.CAMERA
        : PERMISSIONS.ANDROID.CAMERA
    );
    if (isCameraPermitted) {
      ImagePicker.launchCamera(options, response => {
        if (response.didCancel) {
          Alert.alert("Information", "Operation Cancelled");
          return;
        } else if (response.errorCode === "permission") {
          Alert.alert("Information", "Permission not satisfied");
          return;
        } else if (response.errorCode === "others") {
          Alert.alert("Information", response.errorMessage);
          return;
        } else if (
          response.assets?.length &&
          response.assets[0]?.fileSize &&
          response.assets[0].fileSize > 5 * 1024 * 1024
        ) {
          Alert.alert("Information", "File size should be less than 5 MB");
          return;
        }
        if (response.assets && response.assets[0]) {
          setImageData(response.assets[0]);
        }
      });
    }
    setIsModalVisible(false);
  };

  return (
    <>
      <View style={styles.container}>
        <TouchableOpacity
          style={styles.imageSelector}
          onPress={() => setIsModalVisible(true)}
        >
          {imageData?.uri ? (
            <Image
              source={{ uri: imageData.uri }}
              style={styles.selectedImage}
            />
          ) : (
            <AddPhoto height={120} width={120} />
          )}
        </TouchableOpacity>
      </View>
      <Modal
        animationType="fade"
        visible={isModalVisible}
        transparent={true}
        onRequestClose={onClose}
      >
        <View style={styles.modalBackdrop}>
          <View style={styles.modal}>
            <TouchableOpacity onPress={onClose} style={styles.closeIcon}>
              <CloseSvg fill={Colors.White} height={15} width={15} />
            </TouchableOpacity>
            <Text style={styles.modalHeadingText}>Select Photo</Text>
            <View style={styles.row}>
              <TouchableOpacity style={styles.iconButton} onPress={openCamera}>
                <View style={styles.buttonImage}>
                  <CameraSvg fill={Colors.Primary} height={20} width={20} />
                </View>

                <Text style={styles.buttonText}>Camera</Text>
              </TouchableOpacity>
              <TouchableOpacity style={styles.iconButton} onPress={openGallery}>
                <View style={styles.buttonImage}>
                  <GallerySvg fill={Colors.Primary} height={20} width={20} />
                </View>
                <Text style={styles.buttonText}>Gallery</Text>
              </TouchableOpacity>
            </View>
          </View>
        </View>
      </Modal>
    </>
  );
};
export default ImageSelector;
