
import {generatePhotos} from './data.js';
import { renderGallery } from './gallery.js';
import { openUploadForm } from './user-form.js';
renderGallery(generatePhotos());
openUploadForm ();
