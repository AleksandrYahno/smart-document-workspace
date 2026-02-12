import type { IUploadStore, ImmerUploadStoreSetter } from '../uploadStore.interface';
import type { IUploadSlice } from './uploadSlice.interface';
import { FIRST_UPLOAD_STEP, getNextUploadStep, getPrevUploadStep } from '../../../../uploadStep.enum';

export const uploadSlice = (set: ImmerUploadStoreSetter): IUploadSlice => ({
  step: FIRST_UPLOAD_STEP,
  uploadProgress: 0,
  isSubmitting: false,

  setStep: (step) => {
    set((state: IUploadStore) => {
      state.uploadSlice.step = step;
    });
  },

  setUploadProgress: (value) => {
    set((state: IUploadStore) => {
      state.uploadSlice.uploadProgress = value;
    });
  },

  setIsSubmitting: (value) => {
    set((state: IUploadStore) => {
      state.uploadSlice.isSubmitting = value;
    });
  },

  goToNextStep: () => {
    set((state: IUploadStore) => {
      const next = getNextUploadStep(state.uploadSlice.step);

      if (next != null) {
        state.uploadSlice.step = next;
      }
    });
  },

  goToPrevStep: () => {
    set((state: IUploadStore) => {
      const prev = getPrevUploadStep(state.uploadSlice.step);

      if (prev != null) {
        state.uploadSlice.step = prev;
      }
    });
  },

  resetUpload: () => {
    set((state: IUploadStore) => {
      state.uploadSlice.step = FIRST_UPLOAD_STEP;
      state.uploadSlice.uploadProgress = 0;
      state.uploadSlice.isSubmitting = false;
    });
  },
});
