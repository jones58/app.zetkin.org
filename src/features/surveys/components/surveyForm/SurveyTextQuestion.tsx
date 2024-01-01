import { FC } from 'react';
import { ZetkinSurveyTextQuestionElement } from 'utils/types/zetkin';
import { FormControl, FormLabel, TextField } from '@mui/material';

export type SurveyOptionsQuestionProps = {
  element: ZetkinSurveyTextQuestionElement;
};

const SurveyOptionsQuestion: FC<SurveyOptionsQuestionProps> = ({ element }) => {
  return (
    <FormControl sx={{ width: '100%' }}>
      <FormLabel
        htmlFor={`input-${element.id}`}
        style={{
          color: 'black',
          fontSize: '1.5em',
          fontWeight: '500',
          marginBottom: '0.5em',
          marginTop: '0.5em',
        }}
      >
        {element.question.question}
      </FormLabel>
      <TextField
        fullWidth
        id={`input-${element.id}`}
        name={`${element.id}.text`}
        type="text"
      />
    </FormControl>
  );
};

export default SurveyOptionsQuestion;
