import { ReactElement } from 'react';

import { m, makeMessages } from 'core/i18n';

export default makeMessages('feat.surveys', {
  addBlocks: {
    choiceQuestionButton: m('Choice question'),
    openQuestionButton: m('Open question'),
    textButton: m('Text'),
    title: m('Choose a block type to add more content to your survey'),
  },
  blocks: {
    choice: {
      addOption: m('Add option'),
      addOptionsBulk: m('Add options in bulk'),
      bulk: {
        cancelButton: m('Cancel'),
        placeholder: m('Type or paste one option per line'),
        submitButton: m('Add all'),
      },
      description: m('Description'),
      emptyDescription: m('Description'),
      emptyOption: m('Empty option'),
      emptyQuestion: m('Title'),
      question: m('Question'),
      widget: m('Widget'),
      widgets: {
        checkbox: m('Multi-choice (checkboxes)'),
        radio: m('Single-choice (radio buttons)'),
        select: m('Single-choice (drop-down)'),
      },
    },
    deleteBlockDialog: {
      title: m('Delete question'),
      warningText: m(
        'Are you sure you want to delete this question? This action is permanent and cannot be undone.'
      ),
    },
    deleteOptionDialog: {
      title: m('Delete option'),
      warningText: m(
        'Are you sure you want to delete this option? This action is permanent and cannot be undone.'
      ),
    },
    open: {
      description: m('Description'),
      empty: m('Untitled open question'),
      fieldTypePreview: m('text field'),
      label: m('Title'),
      multiLine: m('Multi-line'),
      singleLine: m('Single-line'),
      textFieldType: m('Text field type'),
    },
    text: {
      content: m('Description'),
      empty: m('Untitled block'),
      header: m('Title'),
    },
  },
  chart: {
    header: m('Survey Submissions'),
    placeholder: m('Start collecting submissions to see progress here'),
    subheader: m<{ days: number }>(
      'Accumulated submissions over the last {days, plural, =1 {day} other {# days}}'
    ),
    tooltip: {
      submissions: m<{ count: number }>(
        '{count, plural, =1 {1 submission} other {# submissions}}'
      ),
    },
  },
  editWarning: {
    editing: {
      header: m('Survey can be edited'),
      lockButton: m('Lock'),
      safe: {
        bullet1: m('Fixing spelling mistakes'),
        bullet2: m('Reordering blocks'),
        bullet3: m('Hiding questions'),
        bullet4: m('Adding questions or options'),
        header: m('Safe'),
      },
      subheader: m(
        'Be careful not to make changes that may cause response data to be lost or corrupted.'
      ),
      unsafe: {
        bullet1: m('Deleting questions (hide instead)'),
        bullet2: m(
          'Renaming questions or options in ways that change their meaning'
        ),
        header: m('Unsafe'),
      },
    },
    locked: {
      header: m('Survey locked'),
      subheader: m(
        'This survey has started receiving submissions. Editing the survey now may cause problems with the data. Proceed with caution.'
      ),
      unlockButton: m('Unlock'),
    },
  },
  layout: {
    actions: {
      publish: m('Publish survey'),
      unpublish: m('Unpublish survey'),
    },
    stats: {
      questions: m<{ numQuestions: number }>(
        '{numQuestions, plural, one {1 question} other {# questions}}'
      ),
      submissions: m<{ numSubmissions: number }>(
        '{numSubmissions, plural, one {1 submission} other {# submissions}}'
      ),
    },
  },
  optionCollapse: {
    collapse: m('Collapse'),
    more: m<{ numOfOptions: number }>(
      '{numOfOptions, plural, one {Show 1 more option} other {Show # more options}}'
    ),
  },
  overview: {
    noQuestions: {
      button: m('Create questions'),
      title: m('There are no questions in this survey yet'),
    },
  },
  shareSuborgsCard: {
    caption: m(
      'When this is enabled, officials in sub-organizations can read and search surveys submitted by people connected to their organization.'
    ),
    title: m('Share with suborganizations'),
  },
  state: {
    draft: m('Draft'),
    published: m('Published'),
    scheduled: m('Scheduled'),
    unpublished: m('Unpublished'),
  },
  submissionPane: {
    anonymous: m('Anonymous'),
    hidden: m('Hidden'),
    linked: m('Linked'),
    subtitle:
      m<{ date: ReactElement; person: ReactElement }>('{person} {date}'),
  },
  submissions: {
    anonymous: m('Anonymous'),
    dateColumn: m('Date'),
    emailColumn: m('Email'),
    firstNameColumn: m('First name'),
    lastNameColumn: m('Last name'),
    link: m('Link'),
    personRecordColumn: m('Respondent'),
    suggestedPeople: m('Other linked respondents'),
    unlink: m('Unlink'),
  },
  tabs: {
    overview: m('Overview'),
    questions: m('Questions'),
    submissions: m('Submissions'),
  },
  unlinkedCard: {
    description: m(
      'When someone submits a survey without logging in,that survey will be unlinked. Searching for people in Zetkin based on their survey responses will not work on unlinked submissions.'
    ),
    header: m('Unlinked submissions'),
    openLink: m<{ numUnlink: number }>(
      '{numUnlink, plural, one {Link submission now} other {Link submissions now}}'
    ),
  },
  unlinkedWarningAlert: {
    default: {
      description: m<{ numUnlink: number }>(
        "{numUnlink, plural, one {One survey submission has not been linked to a Zetkin profile, which means that it won't be included when searching.} other {There are survey submissions that have not been linked to Zetkin profiles, which means that they won't be included when searching.}}"
      ),
      header: m('Unlinked submissions'),
      viewUnlinked: m('View unlinked only'),
    },
    filtered: {
      description: m(
        'The list is filtered and only displays signed survey submissions that have not been linked to a profile.'
      ),
      header: m('Viewing unlinked only'),
      viewAll: m('View all'),
    },
  },
  urlCard: {
    nowAccepting: m('Now accepting submissions at this link'),
    open: m('Open for submissions'),
    preview: m('Preview survey'),
    previewPortal: m('Preview survey in activist portal'),
    visitPortal: m('Visit survey in activist portal'),
    willAccept: m('Will accept submissions at this link'),
  },
});
