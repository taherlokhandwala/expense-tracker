import React from "react";
import {
  Card,
  CardHeader,
  CardContent,
  Typography,
  Grid,
  Divider,
} from "@material-ui/core";
import useStyles from "./mainStyles";
import Form from "./Form/Form";
import List from "./List/List";
import useTransactions from "../../useTransactions";

const Main = () => {
  const classes = useStyles();
  const { total: incomeTotal } = useTransactions("Income");
  const { total: expenseTotal } = useTransactions("Expense");
  return (
    <Card className={classes.root}>
      <CardHeader title="Expense Tracker" align="center" />
      <CardContent>
        <Typography variant="h5" align="center" gutterBottom>
          Total Balance <br /> ₹{incomeTotal - expenseTotal}
        </Typography>
        <Divider className={classes.divider} />
        <Form />
      </CardContent>
      <CardContent className={classes.cardContent}>
        <Grid container spacing={2}>
          <Grid item xs={12}>
            <List />
          </Grid>
        </Grid>
      </CardContent>
    </Card>
  );
};

export default Main;
