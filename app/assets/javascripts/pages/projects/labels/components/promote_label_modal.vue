<script>
import _ from 'underscore';
import axios from '~/lib/utils/axios_utils';
import createFlash from '~/flash';
import GlModal from '~/vue_shared/components/gl_modal.vue';
import { s__, sprintf } from '~/locale';
import { visitUrl } from '~/lib/utils/url_utility';
import eventHub from '../event_hub';

export default {
  components: {
    GlModal,
  },
  props: {
    url: {
      type: String,
      required: true,
    },
    labelTitle: {
      type: String,
      required: true,
    },
    labelColor: {
      type: String,
      required: true,
    },
    labelTextColor: {
      type: String,
      required: true,
    },
    groupName: {
      type: String,
      required: true,
    },
  },
  computed: {
    text() {
      return sprintf(
        s__(`Labels|Promoting %{labelTitle} will make it available for all projects inside %{groupName}.
        Existing project labels with the same title will be merged. This action cannot be reversed.`),
        {
          labelTitle: this.labelTitle,
          groupName: this.groupName,
        },
      );
    },
    title() {
      const label = `<span
          class="label color-label"
          style="background-color: ${this.labelColor}; color: ${this.labelTextColor};"
        >${_.escape(this.labelTitle)}</span>`;

      return sprintf(
        s__('Labels|<span>Promote label</span> %{labelTitle} <span>to Group Label?</span>'),
        {
          labelTitle: label,
        },
        false,
      );
    },
  },
  methods: {
    onSubmit() {
      eventHub.$emit('promoteLabelModal.requestStarted', this.url);
      return axios
        .post(this.url, { params: { format: 'json' } })
        .then(response => {
          eventHub.$emit('promoteLabelModal.requestFinished', {
            labelUrl: this.url,
            successful: true,
          });
          visitUrl(response.data.url);
        })
        .catch(error => {
          eventHub.$emit('promoteLabelModal.requestFinished', {
            labelUrl: this.url,
            successful: false,
          });
          createFlash(error);
        });
    },
  },
};
</script>
<template>
  <gl-modal
    id="promote-label-modal"
    :footer-primary-button-text="s__('Labels|Promote Label')"
    footer-primary-button-variant="warning"
    @submit="onSubmit"
  >
    <div
      slot="title"
      class="modal-title-with-label"
      v-html="title"
    >
      {{ title }}
    </div>

    {{ text }}
  </gl-modal>
</template>
