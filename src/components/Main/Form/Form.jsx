import React, { useState } from "react";
import useStyles from "./formStyles";
import {
  TextField,
  Grid,
  Button,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
} from "@material-ui/core";
import { useExpense } from "../../../context/Context";
import { v4 as uuidv4 } from "uuid";
import {
  incomeCategories,
  expenseCategories,
} from "../../../constants/categories";
import { formatDate, printDate } from "../../../utils/formatDate";
import CustomSnackbar from "../../Snackbar/Snackbar";

const Form = () => {
  const initialState = {
    amount: "",
    date: formatDate(new Date()),
    type: "Income",
    category: "",
  };
  const { addTransaction } = useExpense();

  const [formData, setFormData] = useState(initialState);
  const [open, setOpen] = useState(false);

  const selectedCategory =
    formData.type === "Income" ? incomeCategories : expenseCategories;

  const classes = useStyles();

  const handleCreate = () => {
    const transaction = {
      ...formData,
      amount: Number(formData.amount),
      id: uuidv4(),
      date: printDate(formData.date),
    };
    setOpen(true);
    addTransaction(transaction);
    setFormData(initialState);
  };

  return (
    <Grid container spacing={2}>
      <CustomSnackbar open={open} setOpen={setOpen} />
      <Grid item xs={6}>
        <FormControl fullWidth>
          <InputLabel>Type</InputLabel>
          <Select
            value={formData.type}
            onChange={(e) => {
              setFormData({ ...formData, type: e.target.value });
            }}
          >
            <MenuItem value="Income">Income</MenuItem>
            <MenuItem value="Expense">Expense</MenuItem>
          </Select>
        </FormControl>
      </Grid>
      <Grid item xs={6}>
        <FormControl fullWidth>
          <InputLabel>Category</InputLabel>
          <Select
            value={formData.category}
            onChange={(e) => {
              setFormData({ ...formData, category: e.target.value });
            }}
          >
            {selectedCategory.map((c) => (
              <MenuItem key={c.type} value={c.type}>
                {c.type}
              </MenuItem>
            ))}
          </Select>
        </FormControl>
      </Grid>
      <Grid item xs={6}>
        <TextField
          fullWidth
          type="number"
          label="Amount"
          value={formData.amount}
          onChange={(e) => {
            setFormData({ ...formData, amount: e.target.value });
          }}
        />
      </Grid>
      <Grid item xs={6}>
        <TextField
          fullWidth
          type="date"
          label="Date"
          InputLabelProps={{ shrink: true }}
          value={formData.date}
          onChange={(e) => {
            setFormData({ ...formData, date: formatDate(e.target.value) });
          }}
        />
      </Grid>
      <Button
        className={classes.button}
        variant="outlined"
        color="primary"
        fullWidth
        onClick={handleCreate}
      >
        Create
      </Button>
    </Grid>
  );
};

export default Form;
