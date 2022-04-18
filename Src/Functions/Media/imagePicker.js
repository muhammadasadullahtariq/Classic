import ImagePicker from 'react-native-image-crop-picker';


const imagePicker = (responce, setVideoORImageSourceArray) => {
  try {
    if (responce == 'Take Photo') {
      try {
        ImagePicker.openCamera({
          width: 500,
          height: 500,
          cropperCircleOverlay: true,
          compressImageMaxWidth: 640,
          compressImageMaxHeight: 480,
          freeStyleCropEnabled: true,
        }).then(image => {
          setVideoORImageSourceArray({
            path: {uri: image.path},
            responce: image,
          });
        });
      } catch (err) {
        console.log(err);
      }
    } else {
      ImagePicker.openPicker({
        width: 300,
        height: 400,
        cropperCircleOverlay: true,
        freeStyleCropEnabled: true,
        compressImageMaxWidth: 640,
        compressImageMaxHeight: 480,
        avoidEmptySpaceAroundImage: true,
        maxFiles: 1,
      }).then(image => {
        setVideoORImageSourceArray({
          path: {uri: image.path},
          responce: image,
        });
      });
    }
  } catch (err) {
    console.log(err);
  }
};

export default imagePicker;
