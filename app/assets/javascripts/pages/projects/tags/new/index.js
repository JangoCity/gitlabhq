import RefSelectDropdown from '../../../../ref_select_dropdown';
import ZenMode from '../../../../zen_mode';
import GLForm from '../../../../gl_form';

export default () => {
  new ZenMode(); // eslint-disable-line no-new
  new GLForm($('.tag-form'), true); // eslint-disable-line no-new
  new RefSelectDropdown($('.js-branch-select')); // eslint-disable-line no-new
};
