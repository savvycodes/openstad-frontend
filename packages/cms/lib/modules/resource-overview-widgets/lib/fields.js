const ideaStates      = require('../../../../config/idea.js').states;
const sortingOptions  = require('../../../../config/sorting.js').apiOptions;
let resources  = require('../../../../config/resources.js').schemaFormat;

resources = resources.map((resource) => {
  if ('idea' === resource.value) {
    resource.showFields = ['voting', 'displayType', 'allowVotingInOverview'];
  } else if ('article' === resource.value) {
    resource.showFields = ['displayType'];
  } else if ('activeUser' === resource.value) {
    resource.showFields = ['displayType'];
  } else if ('user' === resource.value) {
    resource.showFields = ['displayType'];
  }

  return resource;
});

module.exports = [
  {
    type: 'select',
    name: 'resource',
    label: 'Resource',
    choices : resources
  },
  {
    name: 'voting',
    label: 'Enable voting ',
    help: 'Currently only works with card that opens in the same page.',
    type: 'boolean',
    choices: [
      {
        label: 'Ja',
        value: true,
        showFields: [
          'vote_block_show_text_1',
          'vote_block_show_text_2',
        ]
      },
      {
        label: 'Nee',
        value: false,
        showFields: ['displayType']
      }
    ],
    def: false
  },
  {
    name: 'displayType',
    label: 'Display Type',
    type: 'select',
    choices: [
      {
        value: 'minimalVotes',
        label: 'Card in a row - linking to item on another page',
        value: 'minimalVotes',
        showFields: ['gridder_text_open', 'gridder_tile_image_aspect_ratio', 'gridder_use_field_as_title', 'showVoteCounter', 'pathForResource', 'cardStyle', 'allowVotingInOverview']
      },
      {
        value: 'gridder',
        label: 'Card in a grid - opens item into on the same page',
        showFields: ['gridder_text_open', 'gridder_text_open', '', 'gridder_tile_image_aspect_ratio', 'gridder_use_field_as_title', 'showVoteCounter', 'displayDescription', 'displayShareButtons']
      },
      {
        value: 'raw',
        label: 'Raw (create your own template)',
        showFields: ['rawInput']
      },
    ]
  },
  {
    name: 'cardStyle',
    label: 'Card style',
    type: 'select',
    choices: [
      {
        value: 'card-white card-shadow',
        label: 'White card with shadow',
      },
      {
        value: 'card-grey',
        label: 'Grey card',
      }
    ]
  },
  {
    name: 'fallBackToMapImage',
    label: 'Fall back to map image if no image available?',
    type: 'boolean',
    choices: [
      {
        label: 'Yes',
        value: true,
        showFields: []
      },
      {
        label: 'No',
        value: false,
      }
    ]
  },
  {
    name: 'displayPagination',
    label: 'Display pagination',
    type: 'boolean',
    def: true
  },
  {
    name: 'pathForResource',
    label: 'Url structure for the resource ',
    help: 'For instance /article, the code turns that into /article/10.',
    type: 'string',
  },

  {
    name: 'defaultImage',
    type: 'attachment',
    label: 'Default image',
    trash: true
  },
  {
    name: 'showVoteCounter',
    label: 'Show vote counter (for gridder)',
    type: 'boolean',
    choices: [
      {
        label: 'Yes',
        value: true,
      },
      {
        label: 'No',
        value: false,
      }
    ],
    def: true
  },
  {
    name: 'displayRanking',
    label: 'Display ranking',
    help: 'This is only available if vote count is set to publically viewable in site settings. Mostly used after the voting has finished',
    type: 'boolean',
    choices: [
      {
        label: 'Yes',
        value: true,
      },
      {
        label: 'No',
        value: false,
      }
    ],
    def: true
  },

  {
    name: 'displayTitle',
    label: 'Display Title',
    type: 'boolean',
    choices: [
      {
        label: 'Yes',
        value: true,
      },
      {
        label: 'No',
        value: false,
      }
    ],
    def: true
  },
  {
    name: 'displayLabel',
    label: 'Display Label',
    type: 'boolean',
    choices: [
      {
        label: 'Yes',
        value: true,
      },
      {
        label: 'No',
        value: false,
      }
    ],
    def: true
  },
  {
    name: 'displaySummary',
    label: 'Display summary',
    type: 'boolean',
    choices: [
      {
        label: 'Yes',
        value: true,
      },
      {
        label: 'No',
        value: false,
      }
    ],
    def: true
  },
  {
    name: 'displayDescription',
    label: 'Display description',
    type: 'boolean',
    choices: [
      {
        label: 'Yes',
        value: true,
      },
      {
        label: 'No',
        value: false,
      }
    ],
    def: true
  },
  {
    name: 'displayShareButtons',
    label: 'Display Sharebuttons',
    type: 'boolean',
    choices: [
      {
        label: 'Yes',
        value: true,
      },
      {
        label: 'No',
        value: false,
      }
    ],
    def: true
  },
  {
    name: 'displayVoteProgressBar',
    label: 'Display voting progressbar',
    type: 'boolean',
    choices: [
      {
        label: 'Yes',
        value: true,
      },
      {
        label: 'No',
        value: false,
      }
    ],
    def: true
  },
  {
    name: 'displayVoteForCount',
    label: 'Display vote for count',
    type: 'boolean',
    choices: [
      {
        label: 'Yes',
        value: true,
      },
      {
        label: 'No',
        value: false,
      }
    ],
    def: true
  },
  {
    name: 'displayVoteAgainstCount',
    label: 'Display vote against count',
    type: 'boolean',
    choices: [
      {
        label: 'Yes',
        value: true,
      },
      {
        label: 'No',
        value: false,
      }
    ],
    def: true
  },
  {
    name: 'amountCharsSummary',
    label: 'Amount of characters for the summary',
    type: 'string',
    def: '30'
  },

  {
    name: 'step_1_intro',
    label: 'Step 1: intro',
    type: 'string',
    textarea: true,
    def: 'Kies uit onderstaand overzicht jouw favoriete ontwerp voor de muurtekst ‘Zorg goed voor onze stad en voor elkaar’, en vul in de volgende stap je gegevens in.'
  },
  {
    name: 'step_2_intro',
    label: 'Step 2: intro',
    type: 'string',
    textarea: true,
    def: 'Via onderstaande knop kun je op een aparte pagina je e-mailadres invullen. Ter controle krijg je een mail om je e-mailadres te bevestigen. Als dat lukt kom je terug op deze pagina.'
  },
  {
    name: 'step_2_succesfull_button',
    label: 'Step 2: succesfull feedback in button',
    type: 'string',
    def: 'Gevalideerd'
  },
  {
    name: 'step_2_succesfull_auth',
    label: 'Step 2: succesfully authenticated',
    type: 'string',
    textarea: true,
    def: 'Het controleren van je e-mailadres is gelukt!<br/>Je bent bijna klaar. Klik op onderstaande knop om je stem te versturen.'
  },
  {
    name: 'button_authenticating',
    label: 'Text in button for authenticating',
    type: 'string',
    def: 'Vul je e-mailadres in'
  },
  {
    name: 'placeholder_empty_item',
    label: 'Placeholder when no item is selected',
    type: 'string',
    def: 'Kies een ontwerp'
  },
  {
    name: 'no_selection_error',
    label: 'Error for no selection',
    type: 'string',
    def: 'Je hebt nog geen selectie gemaakt.'
  },
  {
    name: 'success_title',
    label: 'Success title',
    type: 'string',
    def: 'Gelukt, je stem is opgeslagen!'
  },
  {
    name: 'success_message',
    label: 'Success description',
    type: 'string',
    def: 'Bedankt voor het stemmen. Hou deze website<br/> in de gaten voor de uitslag.'
  },
  {
    type: 'checkboxes',
    name: 'selectedSorting',
    label: 'Select sorting available (check one or more)',
    choices: sortingOptions
  },
  {
    name: 'rawInput',
    label: 'Raw input',
    type: 'string',
    textarea: true
  },

  {
    name: 'gridder_text_open',
    label: 'Text for hover on image',
    type: 'string'
  },
  {
    name: 'gridder_tile_image_aspect_ratio',
    label: 'Aspect ratio of images in tiles',
    type: 'string',
    def: '1:1',
  },
  /*
  {
    name: 'gridder_use_field_as_title',
    label: 'Which field should be used as title for an idea',
    type: 'string',
    def: 'title',
  },
  */
  {
    type: 'checkboxes',
    name: 'selectedSorting',
    label: 'Select sorting available (check one or more)',
    choices: sortingOptions
  },
  {
    type: 'select',
    name: 'defaultSorting',
    label: 'Select the default sorting (needs to be checked)',
    choices: sortingOptions
  },
  {
    type: 'string',
    name: 'filterResources',
    label: 'Show only following ideas: (idea id\'s, comma seperated)',
  },
  {
    type: 'string',
    name: 'pageSize',
    label: 'Amount of items per page',
    help: "There is a max of 100 per page",
    def: 24
  },
  {
    name: 'displaySorting',
    label: 'Display sorting',
    type: 'boolean',
    choices: [
      {
        label: 'Yes',
        value: true
      },
      {
        label: 'No',
        value: false,
      }
    ],
  },
  {
    name: 'displayThemeFilter',
    label: 'Display theme filter?',
    type: 'boolean',
    choices: [
      {
        label: 'Yes',
        value: true
      },
      {
        label: 'No',
        value: false,
      }
    ],
  },
  {
    name: 'displayAreaFilter',
    label: 'Display area filter?',
    type: 'boolean',
    choices: [
      {
        label: 'Yes',
        value: true
      },
      {
        label: 'No',
        value: false,
      }
    ],
  },
  {
    name: 'displayArgumentsCount',
    label: 'Display arguments count?',
    type: 'boolean',
    choices: [
      {
        label: 'Yes',
        value: true
      },
      {
        label: 'No',
        value: false,
      }
    ],
  },



  {
    name: 'displayTagFilters',
    label: 'Display tag filters?',
    type: 'boolean',
    choices: [
      {
        label: 'Yes',
        value: true
      },
      {
        label: 'No',
        value: false,
      }
    ],
  },
  {
    name: 'displaySorting',
    label: 'Display sorting',
    type: 'boolean',
    choices: [
      {
        label: 'Yes',
        value: true
      },
      {
        label: 'No',
        value: false,
      }
    ],
  },
  {
    name: 'displaySearch',
    label: 'Display search?',
    type: 'boolean',
    choices: [
      {
        label: 'Yes',
        value: true
      },
      {
        label: 'No',
        value: false,
      }
    ],
    def: true
  },
  {
    type: 'string',
    name: 'filterExcludeThemes',
    label: 'Exclude ideas with this theme'
  },
  {
    type: 'string',
    name: 'filterIncludeThemes',
    label: 'Only show idea including this theme (currently only works with one theme)'
  },
  {
    type: 'string',
    name: 'filterIdeas',
    label: 'Show only following ideas: (idea id\'s, comma seperated)',
    help: 'Warning: This currently  doesn\'t work with sorting, filters and pagination. For multiple theme names, comma seperated'
  },
  {
    type: 'string',
    name: 'resultCountText',
    label: 'Text for amount of results',
    help: 'Example: You are seeing <b>[visibleCount]</b> of in total [totalCount] articles'
  },
  {
    type: 'string',
    name: 'searchText',
    label: 'Text for active search result',
    help: 'Example: You are seeing search results for [searchTerm]'
  },
  {
    type: 'boolean',
    name: 'allowVotingInOverview',
    label: 'Allow for linking on ideas directly in overview',
    help: 'Note: voting only works for ideas with OPEN status'
  },
].concat(
  ideaStates.map((state) => {
    return {
      type: 'string',
      name: 'label' +  state.value,
      label: 'Label for: ' + state.value,
    }
  })
);