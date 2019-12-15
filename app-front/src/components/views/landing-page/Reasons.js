import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import { Typography, Grid, Container } from "@material-ui/core";
import PropType from "prop-types";

const useStyles = makeStyles(() => ({
  root: {
    marginTop: 30
  },
  description: {
    margin: 10
  },
  reasonCard: {
    flex: 1,
    minHeight: 200,
    backgroundColor: "#F1F1F1",
    margin: 10,
    marginTop: 50,
    padding: "20px 10px !important",
    borderRadius: 5
  }
}));

function Reasons() {
  const classes = useStyles();

  return (
    <Container className={classes.root} maxWidth={false}>
      <Typography align="center" variant="h2">
        Why BugManager?
      </Typography>

      <Typography
        align="center"
        variant="subtitle1"
        className={classes.description}
      >
        Comet works with existing ML libraries and has built-in team
        collaboration. Comet works with existing ML libraries and has built-in
        team collaboration.
      </Typography>

      <Grid
        container
        alignItems="center"
        direction="row"
        alignContent="center"
        spacing={1}
        justify="space-around"
      >
        <Reason
          reasonIcon={
            <svg
              width="102"
              height="92"
              viewBox="0 0 102 92"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="M101 56V23C101 21.8954 100.105 21 99 21H71M101 56V89.0001C101 90.1046 100.105 91.0001 99 91.0001H3C1.89543 91.0001 1 90.1046 1 89.0001V56M101 56H71M1 56V23C1 21.8954 1.89543 21 3 21H31M1 56H31M31 56V46M31 56V66.0001M31 56H71M71 56V46M71 56V66.0001M71 21V3C71 1.89543 70.1046 1 69 1H33C31.8954 1 31 1.89543 31 3V21M71 21H31"
                stroke="#262F56"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </svg>
          }
          title="Easy to Use"
          description="Comet works with existing ML libraries and has built-in team collaboration."
        />

        <Reason
          reasonIcon={
            <svg
              width="102"
              height="102"
              viewBox="0 0 102 102"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="M15.9646 16.0354L15.2575 15.3282L14.5504 16.0354L15.2575 16.7425L15.9646 16.0354ZM33.287 33.3577L33.9955 34.0634L34.6998 33.3563L33.9941 32.6506L33.287 33.3577ZM16.0354 15.9646L16.7425 15.2575L16.0354 14.5504L15.3282 15.2575L16.0354 15.9646ZM33.3577 33.287L32.6506 33.9941L33.3563 34.6998L34.0634 33.9955L33.3577 33.287ZM68.6423 33.287L67.9366 33.9955L68.6437 34.6998L69.3494 33.9941L68.6423 33.287ZM85.9646 15.9646L86.6718 15.2575L85.9647 14.5504L85.2575 15.2575L85.9646 15.9646ZM86.0354 16.0354L86.7425 16.7425L87.4496 16.0354L86.7425 15.3283L86.0354 16.0354ZM68.713 33.3577L68.0059 32.6506L67.3002 33.3563L68.0045 34.0634L68.713 33.3577ZM68.713 68.6423L68.0045 67.9366L67.3002 68.6437L68.0059 69.3494L68.713 68.6423ZM86.0354 85.9646L86.7425 86.6718L87.4496 85.9646L86.7425 85.2575L86.0354 85.9646ZM85.9646 86.0354L85.2575 86.7425L85.9646 87.4496L86.6718 86.7425L85.9646 86.0354ZM68.6423 68.713L69.3494 68.0059L68.6437 67.3002L67.9366 68.0045L68.6423 68.713ZM33.3577 68.713L34.0634 68.0045L33.3563 67.3002L32.6506 68.0059L33.3577 68.713ZM16.0354 86.0354L15.3283 86.7425L16.0354 87.4496L16.7425 86.7425L16.0354 86.0354ZM15.9646 85.9646L15.2575 85.2575L14.5504 85.9647L15.2575 86.6718L15.9646 85.9646ZM33.287 68.6423L33.9941 69.3494L34.6998 68.6437L33.9955 67.9366L33.287 68.6423ZM51 102C79.1665 102 102 79.1665 102 51H100C100 78.062 78.062 100 51 100V102ZM0 51C0 79.1665 22.8335 102 51 102V100C23.938 100 2 78.062 2 51H0ZM51 0C22.8335 0 0 22.8335 0 51H2C2 23.938 23.938 2 51 2V0ZM102 51C102 22.8335 79.1665 0 51 0V2C78.062 2 100 23.938 100 51H102ZM15.2575 16.7425L32.5799 34.0648L33.9941 32.6506L16.6718 15.3282L15.2575 16.7425ZM15.3282 15.2575L15.2575 15.3282L16.6718 16.7425L16.7425 16.6718L15.3282 15.2575ZM34.0648 32.5799L16.7425 15.2575L15.3282 16.6718L32.6506 33.9941L34.0648 32.5799ZM34.0634 33.9955C38.4049 29.6712 44.3896 27 51 27V25C43.8393 25 37.3531 27.8961 32.652 32.5785L34.0634 33.9955ZM51 27C57.6104 27 63.5951 29.6712 67.9366 33.9955L69.348 32.5785C64.6469 27.8961 58.1607 25 51 25V27ZM85.2575 15.2575L67.9352 32.5799L69.3494 33.9941L86.6718 16.6718L85.2575 15.2575ZM86.7425 15.3283L86.6718 15.2575L85.2575 16.6717L85.3282 16.7425L86.7425 15.3283ZM69.4201 34.0648L86.7425 16.7425L85.3282 15.3282L68.0059 32.6506L69.4201 34.0648ZM68.0045 34.0634C72.3288 38.4049 75 44.3896 75 51H77C77 43.8393 74.1039 37.3531 69.4215 32.652L68.0045 34.0634ZM75 51C75 57.6104 72.3288 63.5951 68.0045 67.9366L69.4215 69.348C74.1039 64.6469 77 58.1607 77 51H75ZM86.7425 85.2575L69.4201 67.9352L68.0059 69.3494L85.3282 86.6718L86.7425 85.2575ZM86.6718 86.7425L86.7425 86.6718L85.3282 85.2575L85.2575 85.3282L86.6718 86.7425ZM67.9352 69.4201L85.2575 86.7425L86.6718 85.3282L69.3494 68.0059L67.9352 69.4201ZM67.9366 68.0045C63.5951 72.3288 57.6104 75 51 75V77C58.1607 77 64.6469 74.1039 69.348 69.4215L67.9366 68.0045ZM51 75C44.3896 75 38.4049 72.3288 34.0634 68.0045L32.652 69.4215C37.3531 74.1039 43.8393 77 51 77V75ZM16.7425 86.7425L34.0648 69.4201L32.6506 68.0059L15.3282 85.3282L16.7425 86.7425ZM15.2575 86.6718L15.3283 86.7425L16.7425 85.3282L16.6717 85.2575L15.2575 86.6718ZM32.5799 67.9352L15.2575 85.2575L16.6718 86.6718L33.9941 69.3494L32.5799 67.9352ZM33.9955 67.9366C29.6712 63.5951 27 57.6104 27 51H25C25 58.1607 27.8961 64.6469 32.5785 69.348L33.9955 67.9366ZM27 51C27 44.3896 29.6712 38.4049 33.9955 34.0634L32.5785 32.652C27.8961 37.3531 25 43.8393 25 51H27Z"
                fill="#262F56"
              />
            </svg>
          }
          title="Collaboration"
          description="Comet works with existing ML libraries and has built-in team collaboration."
        />

        <Reason
          reasonIcon={
            <svg
              width="102"
              height="97"
              viewBox="0 0 102 97"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="M101 21.5882H6.88235M101 21.5882L80.4118 1M101 21.5882L80.4118 42.1765M1 74.5294H95.1176M1 74.5294L21.5882 53.9412M1 74.5294L21.5882 95.1177"
                stroke="#262F56"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </svg>
          }
          title="Open Source"
          description="Comet works with existing ML libraries and has built-in team collaboration."
        />
      </Grid>
    </Container>
  );
}

function Reason(props) {
  const { reasonIcon, title, description } = props;
  const classes = useStyles();

  return (
    <Grid
      container
      className={classes.reasonCard}
      justify="center"
      alignItems="center"
    >
      <div style={{ width: "100%", display: "flex", justifyContent: "center" }}>
        {reasonIcon}
      </div>

      <Typography
        align="center"
        style={{
          fontVariant: "all-small-caps",
          fontSize: 27,
          fontWeight: 400,
          margin: "20px 0"
        }}
        variant="h5"
      >
        {title}
      </Typography>

      <Typography align="center" variant="body1">
        {description}
        {description}
      </Typography>
    </Grid>
  );
}

Reason.propType = {
  reasonIcon: PropType.any.isRequired,
  title: PropType.string.isRequired,
  description: PropType.string.isRequired,
};

export default Reasons;
