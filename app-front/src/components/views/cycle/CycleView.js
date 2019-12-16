import React from "react";
import Board from "react-trello";
import Grid from "@material-ui/core/Grid"
import Typography from "@material-ui/core/Typography"
import { useQuery } from "@apollo/react-hooks";
import { STATUSES_QUERY } from "../../core/models/statuses/statuses.graphql";
import Loading from "../../lib/Loading";
import BoardCard from "./BoardCard";


function CycleView() {
  const { data, loading: loadingStatuses } = useQuery(STATUSES_QUERY);

  if (loadingStatuses) {
    return (<Loading />);
  }
  const convertData = {
    lanes: data.statuses.map(status => ({
      id: status.id,
      title: status.name,
      cards: status.issues,
    }))
  };

  return (
    <Grid
      container
      direction="column"
      justify="flex-start"
      alignItems="stretch"
    >
      <Typography variant="h1" component="h1" gutterBottom>
        Life Cycle
      </Typography>
      <Grid item xs={12}>
        <Board
          data={convertData}
          draggable
          hideCardDeleteIcon
          components={{ Card: BoardCard }}
          laneStyle={{ maxHeight: "calc(100vh - 116px)", }}
          style={{
            backgroundColor: "#FFFFFF",
            height: "calc(100vh - 100px)",
            boxShadow: "0px 1px 3px 0px rgba(0,0,0,0.2), 0px 1px 1px 0px rgba(0,0,0,0.14), 0px 2px 1px -1px rgba(0,0,0,0.12)",
            borderRadius: "4px",
            color: "#263238",
          }}
        />
      </Grid>
    </Grid>
  )
}

export default CycleView;
