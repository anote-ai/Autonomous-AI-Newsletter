import React, { useEffect } from "react";
import { useDispatch } from "react-redux";
import { useUser, viewUser, refreshCredits } from "../../redux/UserSlice";
import Pricing from "./Pricing";
import { PaidUserStatus } from "../../constants/DbEnums";

function paidUserToStr(paidUserStatus) {
  if (paidUserStatus == PaidUserStatus.FREE_TIER) {
    return "Free Tier";
  } else if (paidUserStatus == PaidUserStatus.BASIC_TIER) {
    return "Essential Edition";
  } else if (paidUserStatus == PaidUserStatus.STANDARD_TIER) {
    return "Professional Publisher";
  } else if (paidUserStatus == PaidUserStatus.PREMIUM_TIER) {
    return "Elite Communicator";
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
    dispatch(refreshCredits())
  }, []);

  var currentPlanStr = paidUserToStr(paidUserStatus);
  var newPlanStartsStr = "";
  if (nextPlan && endDate) {
    newPlanStartsStr = "You will be switched to the " + paidUserToStr(nextPlan) + " on " + endDate + ".";
  }
  let currentPlanIndexOverride = paidUserStatus - 1;

  var isDefaultFreeTrial = false;
  if (user && "is_free_trial" in user && user["is_free_trial"] && (nextPlan == null)) {
    isDefaultFreeTrial = true;
    currentPlanStr = "Free Tier";
  }

  return (
      <div className="text-black bg-white min-h-screen">
        <div className="relative flex justify-center py-20">
          <div className="absolute  left-10 flex flex-col text-left">
            <span>
              <span className="font-semibold">Current Plan : </span>
              {currentPlanStr}
            </span>
            {(endDate != "" && endDate != null) && <span>
              <span className="font-semibold">Plan Expires: </span>
              {endDate}
            </span>}
          </div>
          <h1 className="font-['Gambarino'] sm:text-4xl text-3xl font-bold title-font text-anoteblack-100">
            Newsletter Pricing Plans
          </h1>
        </div>
        <Pricing
          currentPlanIndexOverride={currentPlanIndexOverride}
          productIndex={4}
          nameOverride={"Plans"}
          isCancelable={isCancelable}
          disableUpgrade={true}
          isDefaultFreeTrial={isDefaultFreeTrial}
        />
      </div>
  );
};

export default PaymentsComponent;
