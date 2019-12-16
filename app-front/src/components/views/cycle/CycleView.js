import React from "react";
import Board from "react-trello";
import Grid from "@material-ui/core/Grid"
import Typography from "@material-ui/core/Typography"

const data = {
  lanes: [
    {
      id: 'lane1',
      title: 'Blocked',
      label: '0/0',
      cards: []
    },
    {
      id: 'lane2',
      title: 'Planned Tasks',
      label: '2/2',
      cards: [
        { id: 'Card1', title: 'Write Blog', description: 'Can AI make memes', label: '30 mins' },
        { id: 'Card2', title: 'Pay Rent', description: 'Transfer via NEFT', label: '5 mins', metadata: { sha: 'be312a1' } }
      ]
    },
    {
      id: 'lane3',
      title: 'In Progress',
      label: '0/0',
      cards: []
    },
    {
      id: 'lane4',
      title: 'Completed',
      label: '0/0',
      cards: []
    }
  ]
}

function CycleView() {
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
          data={data}
          draggable
          hideCardDeleteIcon
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
