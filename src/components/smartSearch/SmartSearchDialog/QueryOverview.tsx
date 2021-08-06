import { FormattedMessage as Msg } from 'react-intl';
import { useState } from 'react';
import { Box, Button, DialogActions, IconButton, List, ListItem, Typography } from '@material-ui/core';
import { DeleteOutline, Settings } from '@material-ui/icons';

import DisplayAll from '../filters/All/DisplayAll';
import DisplayCallHistory from '../filters/CallHistory/DisplayCallHistory';
import DisplayCampaignParticipation from '../filters/CampaignParticipation/DisplayCampaignParticipation';
import DisplayMostActive from '../filters/MostActive/DisplayMostActive';
import DisplayPersonData from '../filters/PersonData/DisplayPersonData';
import DisplayPersonTags from '../filters/PersonTags/DisplayPersonTags';
import DisplayRandom from '../filters/Random/DisplayRandom';
import DisplaySurveyResponse from '../filters/SurveyResponse/DisplaySurveyResponse';
import DisplaySurveySubmission from '../filters/SurveySubmission/DisplaySurveySubmission';
import DisplayUser from '../filters/User/DisplayUser';
import { AnyFilterConfig, CallHistoryFilterConfig, CampaignParticipationConfig, FILTER_TYPE, MostActiveFilterConfig,
    PersonDataFilterConfig, PersonTagsFilterConfig, RandomFilterConfig, SmartSearchFilterWithId,
    SurveyResponseFilterConfig, SurveySubmissionFilterConfig, UserFilterConfig } from 'types/smartSearch';

const FIRST_FILTER = 'first_filter';

interface QueryOverviewProps {
    filters: SmartSearchFilterWithId<AnyFilterConfig>[];
    onCloseDialog: () => void;
    onSaveQuery: () => void;
    onOpenFilterGallery: () => void;
    onEditFilter: (filter: SmartSearchFilterWithId) => void;
    onDeleteFilter: (filter: SmartSearchFilterWithId) => void;
    onOpenStartsWithEditor: () => void;
    startsWithAll: boolean;
}

const QueryOverview = (
    {
        filters,
        onCloseDialog,
        onSaveQuery,
        onOpenFilterGallery,
        onEditFilter,
        onDeleteFilter,
        onOpenStartsWithEditor,
        startsWithAll }:QueryOverviewProps,
): JSX.Element => {
    const [hovered, setHovered] = useState<number | null | string>(null);
    return (
        <>
            <Box margin="auto" maxWidth="500px" minWidth={ 0.5 }>
                <List>
                    <ListItem key={ FIRST_FILTER } style={{ padding: 0 }}>
                        <Box
                            alignItems="center"
                            display="flex"
                            flexDirection="column"
                            justifyContent="center"
                            onMouseEnter={ () => setHovered(FIRST_FILTER) }
                            onMouseLeave={ () => setHovered(null) }
                            width={ 1 }>
                            <Typography align="center" variant="body2">
                                <DisplayAll startsWithAll={ startsWithAll } />
                            </Typography>
                            <Box
                                flex={ 1 }
                                visibility={ hovered === FIRST_FILTER ? 'visible' : 'hidden' }>
                                <IconButton
                                    onClick={ onOpenStartsWithEditor }
                                    size="small">
                                    <Settings />
                                </IconButton>
                            </Box>
                        </Box>
                    </ListItem>
                    { filters.filter(f => f.type !== FILTER_TYPE.ALL)
                        .map(filter => (
                            <ListItem key={ filter.id }
                                style={{ padding: 0 }}>
                                <Box
                                    alignItems="center"
                                    display="flex"
                                    flexDirection="column"
                                    justifyContent="center"
                                    onMouseEnter={ () => setHovered(filter.id) }
                                    onMouseLeave={ () => setHovered(null) }
                                    width={ 1 }>
                                    <Typography align="center" variant="body2">
                                        { filter.type === FILTER_TYPE.CALL_HISTORY &&
                                        <DisplayCallHistory
                                            filter={ filter as SmartSearchFilterWithId<CallHistoryFilterConfig> }
                                        /> }
                                        { filter.type === FILTER_TYPE.CAMPAIGN_PARTICIPATION &&
                                        <DisplayCampaignParticipation
                                            filter={ filter as SmartSearchFilterWithId<CampaignParticipationConfig> }
                                        /> }
                                        { filter.type === FILTER_TYPE.MOST_ACTIVE &&
                                        <DisplayMostActive
                                            filter={ filter as SmartSearchFilterWithId<MostActiveFilterConfig>  }
                                        /> }
                                        { filter.type === FILTER_TYPE.PERSON_DATA &&
                                        <DisplayPersonData
                                            filter={ filter as SmartSearchFilterWithId<PersonDataFilterConfig>  }
                                        /> }
                                        { filter.type === FILTER_TYPE.PERSON_TAGS &&
                                        <DisplayPersonTags
                                            filter={ filter as SmartSearchFilterWithId<PersonTagsFilterConfig>  }
                                        /> }
                                        { filter.type === FILTER_TYPE.RANDOM &&
                                        <DisplayRandom
                                            filter={ filter as SmartSearchFilterWithId<RandomFilterConfig>  }
                                        /> }
                                        { filter.type === FILTER_TYPE.SURVEY_RESPONSE &&
                                        <DisplaySurveyResponse
                                            filter={ filter as SmartSearchFilterWithId<SurveyResponseFilterConfig>  }
                                        /> }
                                        { filter.type === FILTER_TYPE.SURVEY_SUBMISSION &&
                                        <DisplaySurveySubmission
                                            filter={ filter as SmartSearchFilterWithId<SurveySubmissionFilterConfig>  }
                                        /> }
                                        { filter.type === FILTER_TYPE.USER &&
                                        <DisplayUser
                                            filter={ filter as SmartSearchFilterWithId<UserFilterConfig>  }
                                        /> }
                                    </Typography>
                                    <Box
                                        flex={ 1 }
                                        visibility={ hovered === filter.id ? 'visible' : 'hidden' }>
                                        <IconButton
                                            onClick={ () => onEditFilter(filter) }
                                            size="small">
                                            <Settings />
                                        </IconButton>
                                        <IconButton
                                            onClick={ () => onDeleteFilter(filter) } size="small">
                                            <DeleteOutline />
                                        </IconButton>
                                    </Box>
                                </Box>
                            </ListItem>
                        )) }
                </List>
                <Box display="flex" justifyContent="center">
                    <Button
                        color="primary"
                        onClick={ onOpenFilterGallery }
                        variant="contained">
                        <Msg id="misc.smartSearch.buttonLabels.addNewFilter"/>
                    </Button>
                </Box>
            </Box>
            <DialogActions>
                <Box display="flex" justifyContent="flex-end" m={ 1 } style={{ gap: '1rem' }}>
                    <Button color="primary" onClick={ onCloseDialog } variant="outlined">
                        <Msg id="misc.smartSearch.buttonLabels.cancel"/>
                    </Button>
                    <Button color="primary" onClick={ onSaveQuery } variant="contained">
                        <Msg id="misc.smartSearch.buttonLabels.save"/>
                    </Button>
                </Box>
            </DialogActions>
        </>
    );
};

export default QueryOverview;
