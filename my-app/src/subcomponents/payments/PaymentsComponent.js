import React, { useEffect } from "react";
import { useDispatch } from "react-redux";
import { useUser, viewUser } from "../../redux/UserSlice";
import Pricing from "./Pricing";
import { PaidUserStatus } from "../../constants/DbEnums";
import { Button } from "flowbite-react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faArrowRight } from "@fortawesome/free-solid-svg-icons";

function paidUserToStr(paidUserStatus) {
  if (paidUserStatus == PaidUserStatus.FREE_TIER) {
    return "Free Tier";
  } else if (paidUserStatus == PaidUserStatus.BASIC_TIER) {
    return "Basic Tier";
  } else if (paidUserStatus == PaidUserStatus.STANDARD_TIER) {
    return "Standard Tier";
  } else if (paidUserStatus == PaidUserStatus.PREMIUM_TIER) {
    return "Premium Tier";
  } else if (paidUserStatus == PaidUserStatus.ENTERPRISE_TIER) {
    return "Enterprise Tier";
  }
  return "Free Tier";
}

const PaymentsComponent = () => {
  let dispatch = useDispatch();

  let user = useUser();
  var paidUserStatus = 0;
  if (user && "paid_user" in user) {
    paidUserStatus = user["paid_user"];
  }
  var endDate = "";
  if (user && "end_date" in user) {
    endDate = user["end_date"];
  }
  var nextPlan = null;
  if (user && "next_plan" in user) {
    nextPlan = user["next_plan"];
  }

  var nextCreditRefreshStr = "";
  if (user && "credits_refresh" in user && paidUserStatus != PaidUserStatus.FREE_TIER) {
    nextCreditRefreshStr = user["credits_refresh"];
  }

  var isCancelable = true;
  if ((endDate != "" && endDate != null) && (nextPlan == null)) {
    isCancelable = false;
  }

  useEffect(() => {
    dispatch(viewUser());
  }, []);

  var currentPlanStr = paidUserToStr(paidUserStatus);
  var newPlanStartsStr = "";
  if (nextPlan && endDate) {
    newPlanStartsStr = "You will be switched to the " + paidUserToStr(nextPlan) + " on " + endDate + ".";
  }
  let currentPlanIndexOverride = paidUserStatus - 1;

  return (
    <div className="flex flex-col h-screen w-5/6 ml-auto min-h-screen bg-gray-600">
      <div className="text-black bg-zinc-100 dark:text-white dark:bg-gray-900 min-h-screen">
        {/* <div className="items-center flex flex-col">
        <p className="sm:text-4xl text-3xl font-medium title-font text-anoteblack-100">
          Billing
        </p>
        <h3>Current Plan: {currentPlanStr}</h3>
        <h3>Next Credit Refresh: {nextCreditRefreshStr}</h3>
      </div> */}

        <div className="relative flex justify-center py-20">
          <div className="absolute  left-10 flex flex-col text-left">
            {/* <span>
              <span className="font-semibold">Current Plan : </span>
              {currentPlanStr}
            </span>
            {(nextCreditRefreshStr != "" && nextCreditRefreshStr != null) && <span>
              <span className="font-semibold">Next Credit Refresh: </span>
              {nextCreditRefreshStr}
            </span>}
            {(endDate != "" && endDate != null) && <span>
              <span className="font-semibold">Plan Expires: </span>
              {endDate}
            </span>}
            {newPlanStartsStr != "" && <span>
              {newPlanStartsStr}
            </span>} */}
          </div>
          <h1 className="sm:text-4xl text-3xl font-bold title-font text-anoteblack-100">
            AutonomousNewsletter Pricing Plans
          </h1>
          <div className="absolute right-10 mx-auto flex">
            <Button
              onClick={() => {
                window.open("https://anote.ai/pricing", "_blank");
              }}
              className="mr-2 font-semibold"
            >
              Other Products
            </Button>
            <Button
              onClick={() => {
                window.open("https://docs.anote.ai/sababa/sababa.html", "_blank");
              }}
              className="font-semibold"
            >
              <span>Learn More</span>
              <FontAwesomeIcon icon={faArrowRight} className="ml-2 w-5 h-5" />
            </Button>
          </div>
        </div>
        <Pricing
          currentPlanIndexOverride={currentPlanIndexOverride}
          productIndex={4}
          nameOverride={"Plans"}
          isCancelable={isCancelable}
          disableUpgrade={true}
        />
      </div>
    </div>
  );
};

export default PaymentsComponent;
