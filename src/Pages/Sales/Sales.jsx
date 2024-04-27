import {
  Form,
  redirect,
  useActionData,
  useLoaderData,
  useNavigate,
} from "react-router-dom";
import axios from "axios";
import { getPageData, updateRecord } from "../../Double/fun";
import {
  Select,
  Input,
  Table,
  Button,
  Grid,
  GridRow,
  GridColumn,
  TableRow,
  TableBody,
  TableCell,
  Card,
  CardContent,
  CardHeader,
  CardDescription,
} from "semantic-ui-react";
import { useEffect, useState } from "react";
import { toast } from "react-toastify";
import {
  MasterUrl,
  records_per_page,
} from "../../Consts/Master/MasterUrl.const";
import OldForm from "../work order/OldForm";
export const getProdData = async (axios, search) => {
  let data = await axios.post(
    `https://arya-erp.in/simranapi/workorder/getProdData.php`,

    {
      search: search,
    }
  );
  // console.log(`inside getProdData function`);
  // console.log(data.data);
  return data.data;
};

export async function loader({ request, params }) {
  const url = new URL(request.url);
  const urlsearch = url.searchParams.get("search");
  const contacts = await getProdData(axios, urlsearch);
  return { contacts, urlsearch };
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

export default function Sales() {
  const { contacts, urlsearch } = useLoaderData();
  const errors = useActionData();

  const [forms, setForms] = useState([]);
  const [formDataArray, setFormDataArray] = useState([]);
  const [idCounter, setIdCounter] = useState(0);

  const handleSave = (formData) => {
    setFormDataArray((prevState) => [...prevState, formData]);
  };

  const addnew = () => {
    const id = idCounter;
    setIdCounter((prevCounter) => prevCounter + 1);
    setForms([
      ...forms,
      <OldForm
        key={id}
        id={id}
        contacts={contacts}
        onSave={handleSave}
        onDelete={handleDelete}
      />,
    ]);
  };

  const handleDelete = (idToDelete) => {
    console.log(idToDelete);
    setForms((prevForms) => {
      const updatedForms = prevForms.filter((_, index) => index !== idToDelete);
      console.log("updatedForms");
      console.log(updatedForms);
      return updatedForms.map((form, index) => {
        const newId = index;
        console.log(newId);
        return React.cloneElement(form, { key: newId, id: newId });
      });
    });

    setFormDataArray((prevState) => {
      const newArray = [...prevState];
      newArray.splice(idToDelete, 1);
      return newArray;
    });
  };
  console.log(formDataArray);

  return (
    <>
      <Form method="post">
        <Grid verticalAlign="middle">
          <GridRow centered color="blue" className="formheader">
            <GridColumn
              floated="right"
              width={4}
              textAlign="right"
              verticalAlign="middle"
            >
              <Button>Submit</Button>
              <Button>Cancel</Button>
            </GridColumn>
          </GridRow>
          <GridRow centered>
            <GridColumn width={12}>
              <Table
                className="borderless-table"
                basic="very"
                style={{ maxWidth: "1200px" }}
              >
                <TableBody>
                  <TableRow>
                    <TableCell
                      textAlign="center"
                      verticalAlign="middle"
                      className="formheader"
                    >
                      Sales Order No.
                    </TableCell>
                    <TableCell>
                      <Input
                        name="order_no"
                        placeholder="Sales Order No.*"
                        error={errors?.order_no}
                      />
                    </TableCell>
                    <TableCell
                      textAlign="center"
                      verticalAlign="middle"
                      className="formheader"
                    >
                      Buyer
                    </TableCell>
                    <TableCell>
                      <Input
                        placeholder="Buyer*"
                        name="buyer"
                        className="form__input"
                        error={errors?.buyer}
                      />
                    </TableCell>
                    <TableCell
                      textAlign="center"
                      verticalAlign="middle"
                      className="formheader"
                    >
                      Shipment Destination
                    </TableCell>
                    <TableCell>
                      <Input
                        name="ship_des"
                        placeholder="Shipment Destination*"
                        error={errors?.ship_des}
                      />
                    </TableCell>
                  </TableRow>
                  <TableRow>
                    <TableCell
                      textAlign="center"
                      verticalAlign="middle"
                      className="formheader"
                    >
                      Shipment Type
                    </TableCell>
                    <TableCell>
                      <Input
                        name="shipmen_type"
                        placeholder="Shipment Type*"
                        error={errors?.shipment_type}
                      />
                    </TableCell>
                    <TableCell
                      textAlign="center"
                      verticalAlign="middle"
                      className="formheader"
                    >
                      Order Confirmation Date
                    </TableCell>
                    <TableCell>
                      <Input
                        type="date"
                        name="confirm_date"
                        placeholder="Order Confirmation Date*"
                        error={errors?.confirm_date}
                      />
                    </TableCell>
                    <TableCell
                      textAlign="center"
                      verticalAlign="middle"
                      className="formheader"
                    >
                      Order Entry Date
                    </TableCell>
                    <TableCell>
                      <Input
                        type="date"
                        name="entry_date"
                        placeholder="Order Entry Date*"
                        error={errors?.entry_date}
                      />
                    </TableCell>
                  </TableRow>
                  <TableRow>
                    <TableCell
                      textAlign="center"
                      verticalAlign="middle"
                      className="formheader"
                    >
                      Style Name
                    </TableCell>
                    <TableCell>
                      <Input
                        name="style_name"
                        placeholder="style_name*"
                        error={errors?.style_name}
                      />
                    </TableCell>
                    <TableCell
                      textAlign="center"
                      verticalAlign="middle"
                      className="formheader"
                    >
                      Style Description
                    </TableCell>
                    <TableCell>
                      <Input
                        name="style_desc"
                        placeholder="Style Description*"
                        error={errors?.style_desc}
                      />
                    </TableCell>
                    <TableCell
                      textAlign="center"
                      verticalAlign="middle"
                      className="formheader"
                    >
                      Factory Location
                    </TableCell>
                    <TableCell>
                      <Input
                        name="factory_loc"
                        placeholder="Factory Location*"
                        error={errors?.factory_loc}
                      />
                    </TableCell>
                  </TableRow>
                  <TableRow>
                    <TableCell
                      textAlign="center"
                      verticalAlign="middle"
                      className="formheader"
                    >
                      Marketing Agent
                    </TableCell>
                    <TableCell>
                      <Input
                        name="marketing_agent"
                        placeholder="Marketing Agent*"
                        error={errors?.marketing_agent}
                      />
                    </TableCell>
                    <TableCell
                      textAlign="center"
                      verticalAlign="middle"
                      className="formheader"
                    >
                      Marketing Commission
                    </TableCell>
                    <TableCell>
                      <Input
                        name="commission"
                        placeholder="Marketing Commission%*"
                        error={errors?.commission}
                      />
                    </TableCell>
                    <TableCell
                      textAlign="center"
                      verticalAlign="middle"
                      className="formheader"
                    >
                      Payment Terms
                    </TableCell>
                    <TableCell>
                      <Input
                        name="payment_terms"
                        placeholder="Payment Terms*"
                        error={errors?.payment_terms}
                      />
                    </TableCell>
                  </TableRow>
                  <TableRow>
                    <TableCell
                      textAlign="center"
                      verticalAlign="middle"
                      className="formheader"
                    >
                      Delivery Terms
                    </TableCell>
                    <TableCell>
                      <Input
                        name="del_terms"
                        placeholder="Delivery Terms*"
                        error={errors?.del_terms}
                      />
                    </TableCell>
                    <TableCell
                      textAlign="center"
                      verticalAlign="middle"
                      className="formheader"
                    >
                      Delivery Date
                    </TableCell>
                    <TableCell>
                      <Input
                        type="date"
                        name="del_date"
                        placeholder="Delivery Date*"
                        error={errors?.del_date}
                      />
                    </TableCell>
                    <TableCell
                      textAlign="center"
                      verticalAlign="middle"
                      className="formheader"
                    >
                      Ex-Factory Date
                    </TableCell>
                    <TableCell>
                      <Input
                        type="date"
                        name="ex_fac_dat"
                        placeholder="Ex-Factory Date*"
                        error={errors?.ex_fac_date}
                      />
                    </TableCell>
                  </TableRow>
                  <TableRow>
                    <TableCell
                      textAlign="center"
                      verticalAlign="middle"
                      className="formheader"
                    >
                      HSN Code
                    </TableCell>
                    <TableCell>
                      <Input
                        name="hsn"
                        placeholder="HSN Code*"
                        error={errors?.hsn}
                      />
                    </TableCell>

                    <TableCell
                      textAlign="center"
                      verticalAlign="middle"
                      className="formheader"
                    >
                      Product Rate
                    </TableCell>
                    <TableCell>
                      <Input
                        name="prod_rate"
                        placeholder="Product Rate*"
                        error={errors?.prod_rate}
                      />
                    </TableCell>
                    <TableCell
                      textAlign="center"
                      verticalAlign="middle"
                      className="formheader"
                    >
                      Merchandiser
                    </TableCell>
                    <TableCell>
                      <Input
                        name="merchandiser"
                        placeholder="Merchandiser*"
                        error={errors?.merchandiser}
                      />
                    </TableCell>
                  </TableRow>
                </TableBody>
              </Table>
            </GridColumn>
          </GridRow>
        </Grid>
      </Form>
      <Grid>
        <GridRow style={{ backgroundColor: "#F9FAFB" }}>
          <GridColumn floated="right" width={3}>
            <Button onClick={addnew} primary>
              Add Product
            </Button>
          </GridColumn>
        </GridRow>
        <GridRow style={{ display: "flex", flexDirection: "column-reverse" }}>
          {forms?.map((FormComponent, index) => (
            <ul key={index}>
              <li>{FormComponent}</li>
            </ul>
          ))}
        </GridRow>
      </Grid>
    </>
  );
}
