import React, { useState } from "react";
import { Image, Modal, Text, TouchableOpacity, View } from "react-native";
import { styles } from "./styles";
import { RatingModalProps } from "./types";
import { Colors } from "styles/colors";
import Button from "components/common/Button";
import CloseSvg from "assets/images/icons/close.svg";
import StarSvg from "assets/images/icons/star.svg";

const RatingModal: React.FC<RatingModalProps> = ({
  visible,
  onClose,
  onConfirm,
}) => {
  const stars = [1, 2, 3, 4, 5];
  const [rating, setRating] = useState<number>(0);

  const submit = () => {
    onConfirm(rating);
  };

  return (
    <Modal
      animationType="fade"
      visible={visible}
      transparent={true}
      onRequestClose={onClose}
    >
      <View style={styles.modalBackdrop}>
        <View style={styles.modal}>
          <TouchableOpacity onPress={onClose}>
            {/* <Image
              source={require("../../assets/images/close.png")}
              style={styles.closeIcon}
            /> */}
            <CloseSvg fill={Colors.White} height={20} width={20} />
          </TouchableOpacity>
          <Text style={styles.modalHeadingText}>Do you like our Venue?</Text>
          <View style={styles.modalContent}>
            <Text style={styles.modalText}>
              Give us a quick rating so that we know if you like us?
            </Text>
            <View style={styles.row}>
              {stars.map((i) => {
                return (
                  <TouchableOpacity onPress={() => setRating(i)}>
                    {/* <Image
                      source={require("../../assets/images/star.png")}
                      style={[
                        styles.starIcon,
                        {
                          tintColor: i <= rating ? Colors.Yellow : Colors.White,
                        },
                      ]}
                    /> */}
                    <StarSvg
                      height={40}
                      width={40}
                      fill={i <= rating ? Colors.Yellow : Colors.White}
                    />
                  </TouchableOpacity>
                );
              })}
            </View>
            <Button title="Submit" onPress={submit} style={styles.button} />
            <Button title="Cancel" onPress={onClose} style={styles.button} />
          </View>
        </View>
      </View>
    </Modal>
  );
};

export default RatingModal;
