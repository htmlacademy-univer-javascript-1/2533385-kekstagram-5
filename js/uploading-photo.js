const SUPPORTED_FILE_TYPES = ['jpg', 'jpeg', 'png'];
const fileInputElement = document.querySelector('.img-upload__input');
const previewImageElement = document.querySelector('.img-upload__preview img');
const effectPreviewElements = document.querySelectorAll('.effects__preview');
const handlePhotoUpload = () => {
  const file = fileInputElement.files[0];
  const fileName = file.name.toLowerCase();
  const fileTypeMatch = SUPPORTED_FILE_TYPES.some((it) => fileName.endsWith(it));
  if (fileTypeMatch) {
    const fileURL = URL.createObjectURL(file);
    previewImageElement.src = fileURL;
    effectPreviewElements.forEach((image) => {
      image.style.backgroundImage = `url(${fileURL})`;
    });
  }
};
export { handlePhotoUpload };
