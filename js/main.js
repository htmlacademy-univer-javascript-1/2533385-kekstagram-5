import { openUploadForm } from './user-form.js';
import { checkFormSubmit, closeUploadForm } from './user-form.js';
import { fetchData } from './api.js';
import { changeScale } from './scale.js';

openUploadForm(changeScale());
fetchData();
checkFormSubmit(closeUploadForm);
