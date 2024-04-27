import axios from "axios";
import React, { useState } from "react";
import { getPageInfo, getPageData, putNewId } from "../../Double/fun";
import AutoComplete from "../work order/AutoComplete";
import {
  MasterUrl,
  records_per_page,
} from "../../Consts/Master/MasterUrl.const";
import {
  Form,
  Link,
  useActionData,
  useLoaderData,
  useNavigate,
} from "react-router-dom";
import {
  Checkbox,
  Grid,
  Input,
  Icon,
  Table,
  Button,
  GridRow,
  GridColumn,
  TableRow,
  TableBody,
  TableHeader,
  Header,
  TableHeaderCell,
  TableCell,
  Breadcrumb,
  BreadcrumbDivider,
  BreadcrumbSection,
  Pagination,
  Label,
  Select,
  Divider,
  TextArea,
} from "semantic-ui-react";
import Navbar from "./Navbar";

export async function loader() {
  const data = await getPageData(
    axios,
    MasterUrl.getPageData,
    records_per_page,
    1,
    "party"
  );
  // console.log(data);
  return data;
}
export async function action({ request, params }) {
  const formData = await request.formData();
  const updates = Object.fromEntries(formData);
  console.log(`formdata:`);
  console.log(updates);
  //console.log(params);
  const error = validation(updates);
  if (Object.keys(error).length) {
    console.log(error);
    return error;
  } else {
    // const res = await updateRecord(axios, params.partyId, updates, "party");
    // if (res == "success") {
    //   toast.success("Successfully Edited");
    //   return redirect(`/master/party/${params.partyId}`);
    // } else {
    //   toast.error("Error");
    //   return null;
    // }
  }

  return null;
}
const validation = (formData) => {
  const errors = {};

  Object.keys(formData).forEach((key) => {
    if (!formData[key]) {
      errors[key] = `Please fill ${key}`;
    }
  });
  console.log(errors);
  return errors;
};

const Reciept = () => {
  const data = useLoaderData();
  const errors = useActionData();
  const [pageData, setPageData] = useState(data);

  const [selectedoption, setSelectedOption] = useState();
  const handleSelectOption = (value) => {
    // console.log(value);
    setSelectedOption(value);
  };
  console.log(selectedoption);

  const [selectedValues, setSelectedValues] = useState([]);
  const handleSelect = (value) => {
    // console.log(value);
    setSelectedValues([...selectedValues, value]);
  };
  console.log(selectedValues);

  const plus_button = {
    background: "transparent",
    padding: "0",
  };

  const tableStyle = {
    border: "none !important",
    // padding:'20px',
  };
  const icons_cell = {
    width: "50px",
  };
  const input_width = {
    width: "100%",
  };
  const [row_id, setRow_id] = useState(1);

  const [rows, setRows] = useState([{ id: 0 }]);
  const handleAddRow = (e) => {
    console.log("add clicked");
    setRow_id(row_id + 1);
    console.log(`row_id:${row_id}`);
    setRows([...rows, { id: rows.length }]);
    console.log(rows);
    e.preventDefault();
  };

  const handleDelRow = (e, ind) => {
    console.log("cross clicked");
    console.log(ind);

    const updated_rows = [...rows];
    console.log(rows);
    console.log(rows.length);
    console.log(updated_rows);

    updated_rows.splice(ind, 1);
    console.log(rows);
    console.log(updated_rows);
    setRows(updated_rows);
    e.preventDefault();
  };

  return (
    <>
      <Form method="post">
        <Grid verticalAlign="middle">
          <GridRow style={{ marginLeft: "15px" }}>
            <Breadcrumb>
              <BreadcrumbSection as={Link} to="/">
                Home
              </BreadcrumbSection>
              <BreadcrumbDivider icon="right chevron" />
              <BreadcrumbSection as={Link} to="/finance">
                Finance
              </BreadcrumbSection>
              <BreadcrumbDivider icon="right chevron" />
              <BreadcrumbSection active>Reciept</BreadcrumbSection>
            </Breadcrumb>
          </GridRow>
          <GridRow>
            <Navbar />
          </GridRow>
          <GridRow centered color="blue" style={{ fontWeight: "900" }}>
            <GridColumn
              floated="right"
              width={6}
              textAlign="right"
              verticalAlign="middle"
            >
              <Button>Submit</Button>
              <Button>Cancel</Button>
            </GridColumn>
          </GridRow>
          <GridRow>
            <Table className="borderless-table" basic="very">
              <TableBody>
                <TableRow>
                  <TableCell verticalAlign="middle" className="formheader">
                    Voucher No.
                    <Input
                      name="voucher_no"
                      placeholder="Vourcher No.*"
                      error={errors?.voucher_no}
                    />
                  </TableCell>
                  <TableCell verticalAlign="middle" className="formheader">
                    Payment Voucher Date
                    <Input
                      type="date"
                      name="voucher_date"
                      placeholder="Vourcher Date*"
                      error={errors?.voucher_date}
                    />
                  </TableCell>
                </TableRow>
                <TableRow>
                  <TableCell verticalAlign="middle" className="formheader">
                    Payment Type
                    <Input
                      name="payment_type"
                      placeholder="Payment Type*"
                      error={errors?.payment_type}
                    />
                  </TableCell>
                  <TableCell verticalAlign="middle" className="formheader">
                    Reference
                    <Input
                      name="reference"
                      placeholder="Reference*"
                      error={errors?.reference}
                    />
                  </TableCell>
                </TableRow>
                <TableRow>
                  <TableCell
                    verticalAlign="middle"
                    className="formheader"
                    style={{ display: "flex" }}
                  >
                    <span style={{ marginTop: "15px" }}>Party</span>
                    <AutoComplete
                      className="customAuto"
                      options={pageData.map((item) => item.company_name)}
                      onSelect={(value) => handleSelectOption(value)}
                    />
                  </TableCell>
                </TableRow>
              </TableBody>
            </Table>
          </GridRow>
          <GridRow centered>
            <Table
              celled
              striped
              style={tableStyle}
              className="table-responsive"
            >
              <TableHeader>
                <TableRow>
                  <TableHeaderCell style={icons_cell}>
                    <Button style={plus_button}>
                      <Icon
                        className="plus"
                        name="plus"
                        onClick={(e) => handleAddRow(e)}
                      />
                    </Button>
                  </TableHeaderCell>
                  <TableHeaderCell>Party</TableHeaderCell>
                  <TableHeaderCell>Amount</TableHeaderCell>
                </TableRow>
              </TableHeader>
              <TableBody>
                {rows.map((row, index) => {
                  return (
                    <TableRow key={`R${row.id}`}>
                      <TableCell style={icons_cell}>
                        <Button style={plus_button}>
                          <Icon
                            className="close_btn"
                            name="close"
                            onClick={(e) => handleDelRow(e, index)}
                          />
                        </Button>
                      </TableCell>
                      <TableCell>
                        <AutoComplete
                          className="customAuto"
                          options={pageData.map((item) => item.company_name)}
                          onSelect={(value) => handleSelect(value)}
                        />
                      </TableCell>
                      <TableCell>
                        <Input
                          placeholder="Amount*"
                          name={`amount${index + 1}`}
                          error={errors?.amount}
                        />
                      </TableCell>
                    </TableRow>
                  );
                })}
              </TableBody>
            </Table>
          </GridRow>
          <GridRow>
            <GridColumn width={6}>
              <textarea
                placeholder="Naration"
                rows="7"
                cols="60"
                name="naration"
                // error={errors?.naration}
              />
            </GridColumn>
            <GridColumn width={4} floated="right">
              <Table className="borderless-table" basic="very">
                <TableBody>
                  <TableRow>
                    <TableCell verticalAlign="middle" className="formheader">
                      Payment Method
                    </TableCell>
                    <TableCell>
                      <select
                        placeholder="Method"
                        className="select"
                        name="pay_method"
                        id="pay_method"
                      >
                        <option value="cash">Cash</option>
                        <option value="cheque">Cheque</option>
                        <option value="UPI">UPI</option>
                      </select>
                    </TableCell>
                  </TableRow>
                  <TableRow>
                    <TableCell verticalAlign="middle" className="formheader">
                      Cheque Number
                    </TableCell>
                    <TableCell>
                      <Input
                        name="cheque_no"
                        placeholder="Cheque Number*"
                        error={errors?.cheque_no}
                      />
                    </TableCell>
                  </TableRow>
                  <TableRow>
                    <TableCell verticalAlign="middle" className="formheader">
                      Cheque Date
                    </TableCell>
                    <TableCell>
                      <Input
                        type="date"
                        name="cheque_date"
                        placeholder="Cheque Date*"
                        error={errors?.cheque_date}
                      />
                    </TableCell>
                  </TableRow>
                  <TableRow>
                    <TableCell verticalAlign="middle" className="formheader">
                      Payable Amount
                    </TableCell>
                    <TableCell>
                      <Input
                        name="payable_amount"
                        placeholder="Payable Amount*"
                        error={errors?.payable_amount}
                      />
                    </TableCell>
                  </TableRow>
                </TableBody>
              </Table>
            </GridColumn>
          </GridRow>
        </Grid>
      </Form>
    </>
  );
};

export default Reciept;
