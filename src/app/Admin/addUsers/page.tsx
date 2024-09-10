import React from "react";
import Breadcrumb from "../components/BreadCrumbs/Breadcrumbs";
import DefaultLayout from "../components/layouts/DefaultLayout";
import SignUp from "../addUsers/AddUsers";
const AddUsers = () => {
  return (
    <DefaultLayout>
      <Breadcrumb pageName="AddUsers" />
      {/* <div className="text-center text-xl text-red">AddUsers</div>; */}
      <SignUp />
    </DefaultLayout>
  );
};

export default AddUsers;
