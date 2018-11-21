export const getCurrentUser = current_user => ({
  type: "CURRENT_USER",
  current_user
});

export const getAuthStatus = auth_status => ({
  type: "AUTHENTICATED",
  auth_status
});

export const getEntriesModalState = entries_modal_status => ({
  type: "ENTRIES_MODAL_STATE",
  entries_modal_status
})

export const getEditEntriesModalState = edit_entries_modal_status => ({
  type: "EDIT_ENTRIES_MODAL_STATE",
  edit_entries_modal_status
})

export const getEntriesModalID = entries_modal_id => ({
  type: "ENTRIES_MODAL_ID",
  entries_modal_id
})
