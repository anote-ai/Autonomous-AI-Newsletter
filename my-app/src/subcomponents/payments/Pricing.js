import React, { useState, useEffect } from "react";
import { useDispatch } from "react-redux";
import fetcher from "../../http/RequestConfig";
import { createPortalSession } from "../../redux/UserSlice";
import { Button } from "flowbite-react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faArrowRight } from "@fortawesome/free-solid-svg-icons";

const Pricing = (props) => {
  let dispatch = useDispatch();
  var showCurrentPlan =
    !(typeof props.currentPlanIndexOverride == "undefined") &&
    props.currentPlanIndexOverride != -1;
  const product1 = {
    id: 1,
    title: "Data Labeler",
    url: "https://anote.ai/faqs",
    tiers: [
      {
        name: "Basic",
        price: "$250",
        month: true,
        productHash: "labeler1",
        features: [
          "Dataset size: Up to 5,000 rows",
          "Annotations allowed: Up to 1,000 annotations",
          "Number of users: Up to 5 (1 admin, 4 annotators)",
        ],
      },
      {
        name: "Standard",
        price: "$500",
        month: true,
        popular: true,
        productHash: "labeler2",
        features: [
          "Dataset size: Up to 25,000 rows",
          "Annotations allowed: Up to 5,000 annotations",
          "Number of users: Up to 15 (3 admin, 12 annotators)",
        ],
        extraFeature: "Priority email support",
      },
      {
        name: "Premium",
        price: "$1,000",
        month: true,
        productHash: "labeler3",
        features: [
          "Dataset size: Up to 50,000 rows",
          "Annotations allowed: Up to 10,000 annotations",
          "Number of users: Up to 30 (5 admin, 25 annotators)",
          "API Access: limited functionality",
        ],
        extraFeature:
          "Priority email support, annotator metrics, Recomposition capability",
      },
      {
        name: "Enterprise",
        price: "Contact us",
        month: false,
        features: [
          "Dataset size: Custom (Negotiable)",
          "Annotations allowed: Unlimited",
          "Number of users: Unlimited",
          "API Access: Unlimited",
        ],
        extraFeature: "Advanced customization options to your use case",
      },
    ],
  };
  const product2 = {
    id: 2,
    title: "AI newsletter",
    url: "https://docs.anote.ai/newsletter/newsletter.html",
    forceContactUs: true,
    tiers: [
      {
        name: "Basic",
        price: "$50",
        month: true,
        features: [
          "Keyword-based customized and automated emails",
          "Access to Google News as the data source",
          "Emails sent from fixed email address",
          "Maximum number of emails: 500/month",
        ],
      },
      {
        name: "Standard",
        price: "$100",
        month: true,
        features: [
          "All features from the Basic Tier",
          "Custom styles of newsletters (colors, fonts, titles)",
          "Ability to edit the newsletter content",
          "Ability to send the newsletter from your email address",
          "Ability to upload a CSV to send emails to contacts",
          "Maximum number of emails: 5,000/month",
        ],
      },
      {
        name: "Premium",
        price: "$250",
        month: true,
        popular: true,
        features: [
          "All features from the Standard Tier",
          "Custom styles / user personas for emails (Einstein, Musk, via prompts)",
          "Automated email sequence, in bulk, to your contacts every 3 days",
          "Support for different data sources besides Google News",
          "Maximum number of emails: 25,000/month",
        ],
      },
      {
        name: "Enterprise",
        price: "Contact us",
        month: false,
        features: [
          "All features from the Premium Tier",
          "Full customization options for the newsletter style to meet your requirements",
          "Unlimited email sends",
        ],
      },
    ],
  };
  const product3 = {
    id: 3,
    title: "Private GPT",
    url: "https://docs.anote.ai/privategpt/privategpt.html",
    forceContactUs: true,
    tiers: [
      {
        name: "Basic",
        price: "Free",
        month: false,
        features: [
          "Access to the standard GPT model without privacy-preserving features",
          "Supported Text File Formats: PDFs only",
          "Maximum Number of Files: Up to 5 files per session",
          "Total File Size Limit: Up to 10 MB per session",
          "Maximum Chats: 5 chats per month",
        ],
      },
      {
        name: "Standard",
        price: "$500",
        popular: true,
        month: true,
        features: [
          "Privacy-preserving LLM using a model like GPT-4ALL or LLAMA",
          "Limited file upload sizes",
          "Supported Text File Formats: PDFs and TXT files",
          "Maximum Number of Files: Up to 20 files per session",
          "Total File Size Limit: Up to 50 MB per session",
          "Maximum Chats: 20 chats per month",
        ],
      },
      {
        name: "Premium",
        price: "$1,000",
        month: true,
        features: [
          "Privacy-preserving LLM using a more powerful model like LLAMA2",
          "Support for larger file upload sizes to handle more data",
          "Supported Text File Formats: All text file types (e.g., PDFs, TXT files, DOCX files, etc.)",
          "Maximum Number of Files: Up to 50 files per session",
          "Total File Size Limit: Up to 100 MB per session",
          "Maximum Chats: 50 chats per month",
        ],
      },
      {
        name: "Enterprise",
        month: false,
        price: "Contact us",
        features: [
          "Fully custom private LLM tailored to your specific use case and requirements",
          "Advanced features and dedicated support",
          "Supported Text File Formats: All text file types (e.g., PDFs, TXT files, DOCX files, etc.), and more based on your needs",
          "Maximum Number of Files: Customizable based on enterprise requirements",
          "Total File Size Limit: Customizable based on enterprise requirements",
          "Maximum Chats: Unlimited chats per month",
        ],
      },
    ],
  };
  const product4 = {
    id: 4,
    title: "Newsletter",
    url: "https://docs.anote.ai/Newsletter/Newsletter.html",
    signUpBaseUrl: "https://nwsltr.anote.ai",
    // signUpBaseUrl: "http://localhost:3000",
    // extraBenefits: [
    //   "Additional credit packs available for purchase, starting at $50 for 500 credits.",
    //   "Unused credits roll over to the next month for active subscribers.",
    //   "Regular feature updates and enhancements included.",
    // ],
    tiers: [
      {
        name: "Basic",
        price: "$100",
        month: true,
        popular: true,
        productHash: "newsletter1",
        features: [
          "Keyword-based customized and automated emails",
          "Access to Google News as the data source",
          "Emails sent from fixed email address",
          "Maximum number of emails: 500/month",
        ],
        extraFeature: "Email support included",
      },
      // {
      //   name: "Standard",
      //   price: "$200",
      //   month: true,
      //   productHash: "newsletter2",
      //   features: [
      //     // "Searches: 2,000 credits",
      //     "Unlocks for Emails: 500 credits",
      //     "Ideal for growing businesses and professionals with increased search requirements.",
      //   ],
      //   extraFeature: "Priority email support included",
      // },
      // {
      //   name: "Premium",
      //   price: "$500",
      //   month: true,
      //   productHash: "newsletter3",
      //   features: [
      //     // "Searches: 5,000 credits",
      //     "Unlocks for Emails: 1,500 credits",
      //     "Perfect for established companies and dedicated researchers needing higher search limits.",
      //   ],
      //   extraFeature: "Dedicated phone and email support included",
      // },
      {
        name: "Enterprise",
        price: "Contact us",
        month: false,
        features: [
          // "Searches: 15,000+ credits",
          "Unlocks for Emails and Phone Numbers: 3,000+ credits",
          "Tailored for large enterprises and organizations with extensive search demands.",
        ],
        extraFeature: "24/7 priority support with a dedicated account manager.",
      },
    ],
  };

  const [product, setProduct] = useState(product1);
  const [selectedProductId, setSelectedProductId] = useState(
    props.productIndex ? props.productIndex : product1.id
  );

  useEffect(() => {
    switch (selectedProductId) {
      case product1.id:
        setProduct(product1);
        break;
      case product2.id:
        setProduct(product2);
        break;
      case product3.id:
        setProduct(product3);
        break;
      case product4.id:
        setProduct(product4);
        break;
      default:
        break;
    }
  }, [selectedProductId]);

  const handleClick = async () => {
    fetcher("/create-checkout-session", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
    })
      .then((res) => {
        if (res.ok) {
          console.log("yes");
          return res.json();
        }
        return res.json().then((json) => Promise.reject(json));
      })
      .then(({ url }) => {
        console.log("url: ", url);
        // window.location = url;
      })
      .catch((e) => {
        console.error(e.error);
      });
  };

  function buttonText(
    tier,
    product,
    currentPlanIndexOverride,
    showCurrentPlan,
    index
  ) {
    if (tier.price == "Contact us" || product.forceContactUs == true || !props.isCancelable) {
      return "Contact us";
    } else {
      if (!showCurrentPlan) {
        return "Sign Up";
      } else {
        if (currentPlanIndexOverride == index) {
          return "Cancel";
        } else {
            if (props.disableUpgrade) {
                return "Contact us";
            } else {
                if (currentPlanIndexOverride > index) {
                    return "Downgrade";
                } else {
                    return "Upgrade";
                }
            }
        }
      }
    }
  }

  function buttonAction(
    tier,
    product,
    currentPlanIndexOverride,
    showCurrentPlan,
    index
  ) {
    if (tier.price == "Contact us" || product.forceContactUs == true || !props.isCancelable || (showCurrentPlan && currentPlanIndexOverride != index && props.disableUpgrade)) {
      var emailAddress = "support@anote.ai";
      var subject = "Anote Sales: " + product.title;
      var body =
        "Hi, I am interested in Anote's " +
        product.title +
        " product and I am looking to get more information.";
      window.location.href =
        "mailto:" +
        emailAddress +
        "?subject=" +
        encodeURIComponent(subject) +
        "&body=" +
        encodeURIComponent(body);
    } else {
      if (!showCurrentPlan) {
        window.location =
          product.signUpBaseUrl + "?product_hash=" + tier.productHash;
      } else {
        var newPaymentTier = null;
        if (currentPlanIndexOverride == index) {
          newPaymentTier = 0;
        } else {
          newPaymentTier = index + 1;
        }
        dispatch(createPortalSession({ paymentTier: newPaymentTier })).then(
          (resp) => {
            if (!("error" in resp)) {
              window.open(resp.payload, "_blank");
            }
          }
        );
      }
    }
  }

  return (
    <section className="text-anoteblack-100 body-font overflow-hidden">
      <div className="px-5 mx-auto flex flex-col">
        <div className="flex flex-col text-center w-full ">
          {props.productIndex == null && (
            <p className="lg:w-2/3 mx-auto leading-relaxed text-base text-gray-500">
              Select the product you are interested in to see the pricing tiers
            </p>
          )}
          {props.productIndex == null && (
            <div className="flex mx-auto border-2 border-turquoise-500 rounded overflow-hidden mt-6">
              <button
                onClick={() => setSelectedProductId(product1.id)}
                className={`py-1 px-4 ${
                  selectedProductId === product1.id
                    ? "bg-turquoise-500 text-black font-semibold"
                    : "text-white border-r-2 border-turquoise-500"
                } focus:outline-none`}
              >
                Data Labeler
              </button>
              <button
                onClick={() => setSelectedProductId(product2.id)}
                className={`py-1 px-4 ${
                  selectedProductId === product2.id
                    ? "bg-turquoise-500 text-black font-semibold"
                    : "text-white border-r-2 border-turquoise-500"
                } focus:outline-none`}
              >
                AI newsletter
              </button>
              <button
                onClick={() => setSelectedProductId(product3.id)}
                className={`py-1 px-4 ${
                  selectedProductId === product3.id
                    ? "bg-turquoise-500 text-black font-semibold"
                    : "text-white border-r-2 border-turquoise-500"
                } focus:outline-none`}
              >
                Private GPT
              </button>
              <button
                onClick={() => setSelectedProductId(product4.id)}
                className={`py-1 px-4 ${
                  selectedProductId === product4.id
                    ? "bg-turquoise-500 text-black font-semibold"
                    : "text-white border-r-2 border-turquoise-500"
                } focus:outline-none`}
              >
                Newsletter
              </button>
            </div>
          )}
        </div>
        <div className="flex flex-wrap -m-4">
          {product.tiers.map((tier, index) => (
            <>
              <div className="p-4 xl:w-1/4 md:w-1/2 w-full">
                <div
                  className={`${
                    (tier.popular && !showCurrentPlan) ||
                    props.currentPlanIndexOverride == index
                      ? "border-teal-500 border-4"
                      : "border-sky-700 dark:border-gray-300 border-2"
                  } h-full p-6 rounded-lg  flex flex-col relative overflow-hidden`}
                >
                  {((tier.popular && !showCurrentPlan) ||
                    props.currentPlanIndexOverride == index) && (
                    <span class="bg-teal-500 text-white font-semibold px-3 py-1 tracking-widest text-xs absolute right-0 top-0 rounded-bl">
                      {showCurrentPlan ? "CURRENT PLAN" : "POPULAR"}
                    </span>
                  )}
                  <div className="text-lg tracking-widest font-medium">
                    {tier.name}
                  </div>
                  <h1
                    className={`${
                      tier.month ? "text-5xl pb-4" : "text-4xl pb-6"
                    }  text-sky-700 dark:text-sky-300  mb-4 border-b border-gray-200 leading-none`}
                  >
                    <span>{tier.price}</span>
                    {tier.month && (
                      <span class="text-lg ml-1 font-normal text-gray-500">
                        /mo
                      </span>
                    )}
                  </h1>
                  <div className="mb-5">
                    {tier.features.map((feature) => (
                      <p className="flex items-baseline text-anoteblack-200 mb-2">
                        <span className="w-4 h-4 mr-2 inline-flex items-center justify-center bg-sky-700  dark:bg-sky-500 text-white  rounded-full flex-shrink-0">
                          <svg
                            fill="none"
                            stroke="currentColor"
                            stroke-linecap="round"
                            stroke-linejoin="round"
                            stroke-width="2.5"
                            className="w-3 h-3"
                            viewBox="0 0 24 24"
                          >
                            <path d="M20 6L9 17l-5-5"></path>
                          </svg>
                        </span>
                        {feature}
                      </p>
                    ))}
                  </div>
                  <Button
                    className="relative justify-start"
                    onClick={() => {
                      buttonAction(
                        tier,
                        product,
                        props.currentPlanIndexOverride,
                        showCurrentPlan,
                        index
                      );
                    }}
                  >
                    {buttonText(
                      tier,
                      product,
                      props.currentPlanIndexOverride,
                      showCurrentPlan,
                      index
                    )}
                    {/* {(tier.price == "Contact us" || (product.forceContactUs == true)) ? "Contact us" :
                    (!showCurrentPlan ? "Sign Up" :
                      ((props.currentPlanIndexOverride == index) ? "Cancel" : "Sign Up")
                    )
                    } */}
                    <span className="absolute right-3">
                      <FontAwesomeIcon
                        icon={faArrowRight}
                        className="ml-2 w-5 h-5"
                      />
                    </span>
                  </Button>
                </div>
              </div>
            </>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Pricing;
