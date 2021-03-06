export const getCurrentUser = current_user => ({
  type: "CURRENT_USER",
  current_user
});

export const getAuthStatus = auth_status => ({
  type: "AUTHENTICATED",
  auth_status
});

export const getFirstLoadStatus = first_load => ({
  type: "FIRST_LOAD",
  first_load
});

export const getEntriesModalState = entries_modal_status => ({
  type: "ENTRIES_MODAL_STATE",
  entries_modal_status
})

export const getEditEntriesModalState = edit_entries_modal_status => ({
  type: "EDIT_ENTRIES_MODAL_STATE",
  edit_entries_modal_status
})

export const getKeyModalState = key_modal_status => ({
  type: "KEY_MODAL_STATE",
  key_modal_status
})

export const getArchiveModalState = archive_modal_status => ({
  type: "ARCHIVE_MODAL_STATE",
  archive_modal_status
})

export const getEntriesModalID = entries_modal_id => ({
  type: "ENTRIES_MODAL_ID",
  entries_modal_id
})

export const getCurrentEntry = current_entry => ({
  type: "CURRENT_ENTRY",
  current_entry
})

export const getAllEntries = all_entries => ({
  type: "ALL_ENTRIES",
  all_entries
})

export const getNavMonths = nav_months => ({
  type: "NAV_MONTHS",
  nav_months
})

export const getStoreHabits = habits => ({
  type: "HABITS",
  habits
})

export const getStoreHabitEntries = habit_entries => ({
  type: "HABIT_ENTRIES",
  habit_entries
})

export const getStoreCalendarEntries = calendar_entries => ({
  type: "CALENDAR_ENTRIES",
  calendar_entries
})

export const getStoreJournalEntries = journal_entries => ({
  type: "JOURNAL_ENTRIES",
  journal_entries
})

export const resetStore = () => ({
  type: "RESET_STORE",
})

export const getSnackBarState = snack_bar_state => ({
  type: "SNACK_BAR_STATE",
  snack_bar_state
})

export const getSnackBarMessage = snack_bar_message => ({
  type: "SNACK_BAR_MESSAGE",
  snack_bar_message
})

export const getLoadingStatus = loading_status => ({
  type: "LOADING_STATUS",
  loading_status
})
