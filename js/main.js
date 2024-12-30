import { openUploadForm } from './user-form.js';
import { checkFormSubmit, closeUploadForm } from './user-form.js';
import { getData } from './api.js';
import { changeScale } from './scale.js';

openUploadForm(changeScale());
getData();
checkFormSubmit(closeUploadForm);
