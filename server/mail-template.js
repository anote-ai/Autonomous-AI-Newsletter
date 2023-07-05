const HTML_TEMPLATE = (
  data,
  selectedCardColor,
  selectedTextColor,
  selectedBackgroundColor,
  selectedFont,
  selectedTextFont,
  selectedFontSize
) => {
  let data_arr = JSON.parse(data);
  let formated_data = data_arr
    .map((item) => {
      return `
  <div style="color:${selectedTextColor}; padding:10px; background-color:${selectedCardColor}; margin:1rem;">
    <h2 style=" text-align:left; font-family:${selectedTextFont}">${item.title}</h2>
    <p style=" text-align:left;">${item.date}</p>
    <p style=" text-align:left;color:${selectedTextColor};font-family:${selectedTextFont}; fontSize:${selectedFontSize}">${item.summary}</p>
    <a style="display: block; text-align: left;color:${selectedTextColor};font-family:${selectedTextFont};" href="${item.url}">${item.url}</a>
  </div>
`;
    })
    .join("");

  return `
      <!DOCTYPE html>
      <html>
        <head>
          <meta charset="utf-8">
          <title>NodeMailer Email Template</title>

        </head>
        <body style="display: flex; justify-content: center; align-items: center; ">
        <div style="  justifyContent: center; background-color: ${selectedBackgroundColor}; width: 100%; height: 100%; display: flex; text-align: center; flex-direction: column">
        <div>
          <h1 style="font-size: 4rem; font-weight: bold; margin-top: 20px; margin-bottom: 4px; color:${selectedTextColor}; font-family:${selectedFont}"
          >
            Newsletter Creator
          </h1>

          <h3 style="font-size: 32px; color: white; font-weight: bold; font-family:${selectedFont};color:${selectedTextColor};">
            Your Stories, Your Voice, Your Newsletter.

          </h3>

          ${formated_data}

        </div>

        </div>
        </div>
        </body>
      </html>
    `;
};

export default HTML_TEMPLATE;
