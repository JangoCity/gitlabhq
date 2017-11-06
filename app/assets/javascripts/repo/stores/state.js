export default () => ({
  canCommit: false,
  currentBranch: '',
  currentBlobView: 'repo-preview',
  currentRef: '',
  discardPopupOpen: false,
  downloads: {},
  editMode: false,
  endpoints: {},
  isRoot: false,
  isInitialRoot: false,
  lastCommitPath: '',
  loading: false,
  onTopOfBranch: false,
  newEntryModalOpen: false,
  newEntryModalType: '',
  openFiles: [],
  path: '',
  project: {
    id: 0,
    name: '',
    url: '',
  },
  parentTreeUrl: '',
  previousUrl: '',
  tree: [],
});
