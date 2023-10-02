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
      <div className="text-white">
        <div className="relative flex justify-center py-20">
          <h1 className="sm:text-4xl text-3xl font-bold title-font text-anoteblack-100">
            Newsletter Pricing Plans
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
                window.open("https://docs.anote.ai/newsletter/newsletter.html", "_blank");
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
  );
};

export default PaymentsComponent;
