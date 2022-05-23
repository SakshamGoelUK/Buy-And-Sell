if (performance.getEntriesByType("navigation")[0].type === "back_forward") {
  location.reload(true);
}
const submit = document.querySelector(".submit");
const phoneInput = document.querySelector(".phoneInput");
const uploadBtn = document.querySelector("#imageUpload");
const input1 = document.querySelector("#phone");
const form1 = document.querySelector("#uploadForm");
const countryE = document.querySelector(".countryError");
const stateE = document.querySelector(".stateError");
const editForm = document.querySelector("#editForm");
const privacy = document.querySelector(".privacy1");
const password1 = document.querySelector(".password1");
const general = document.querySelector(".general1");
const accountT = document.querySelector(".accountT");
const privacyT = document.querySelector(".privacyT");
const passwordT = document.querySelector(".passwordT");
const activate = (option) => {
  general.style.display = "none";
  privacy.style.display = "none";
  password1.style.display = "none";
  option.style.display = "block";
};
privacyT.addEventListener("click", () => {
  activate(privacy);
});
passwordT.addEventListener("click", () => {
  activate(password1);
});
accountT.addEventListener("click", () => {
  activate(general);
});
let suggestions;
uploadBtn.addEventListener("input", () => {
  const submitBtn = document.createElement("button");
  submitBtn.classList.add("btn");
  submitBtn.classList.add("btn-primary");
  submitBtn.classList.add("btn-lg");
  submitBtn.type = "submit";
  submitBtn.innerText = "Submit";
  form1.appendChild(submitBtn);
  removeEventListener("input1", uploadBtn);
});
const checkPhone = (e) => {
  const pattern = /\D/;
  if (pattern.test(input1.value)) {
    phoneInput.style.display = "block";
    submit.classList.add("disabled");
    input1.classList.add("is-invalid");
  } else {
    phoneInput.style.display = "none";
    input1.classList.remove("is-invalid");
    submit.classList.remove("disabled");
  }
};
input1.addEventListener("input", checkPhone);
window.intlTelInput(input1, {
  separateDialCode: true,
  utilsScript: "../public/intl-tel-input/build/js/utils.js",
});
editForm.addEventListener("submit", () => {
  input1.removeEventListener("input", checkPhone);
  input1.value = myCode.innerText + input1.value;
});
var dropdownElementList = [].slice.call(
  document.querySelectorAll(".dropdown-toggle")
);
var dropdownList = dropdownElementList.map(function (dropdownToggleEl) {
  return new bootstrap.Dropdown(dropdownToggleEl);
});
let instances, ulList, instances1;
let data = {
  Afghanistan:
    "https://cdn.jsdelivr.net/npm/country-flag-emoji-json@2.0.0/dist/images/AF.svg",
  "Åland Islands":
    "https://cdn.jsdelivr.net/npm/country-flag-emoji-json@2.0.0/dist/images/AX.svg",
  Albania:
    "https://cdn.jsdelivr.net/npm/country-flag-emoji-json@2.0.0/dist/images/AL.svg",
  Algeria:
    "https://cdn.jsdelivr.net/npm/country-flag-emoji-json@2.0.0/dist/images/DZ.svg",
  "American Samoa":
    "https://cdn.jsdelivr.net/npm/country-flag-emoji-json@2.0.0/dist/images/AS.svg",
  Andorra:
    "https://cdn.jsdelivr.net/npm/country-flag-emoji-json@2.0.0/dist/images/AD.svg",
  Angola:
    "https://cdn.jsdelivr.net/npm/country-flag-emoji-json@2.0.0/dist/images/AO.svg",
  Anguilla:
    "https://cdn.jsdelivr.net/npm/country-flag-emoji-json@2.0.0/dist/images/AI.svg",
  Antarctica:
    "https://cdn.jsdelivr.net/npm/country-flag-emoji-json@2.0.0/dist/images/AQ.svg",
  "Antigua and Barbuda":
    "https://cdn.jsdelivr.net/npm/country-flag-emoji-json@2.0.0/dist/images/AG.svg",
  Argentina:
    "https://cdn.jsdelivr.net/npm/country-flag-emoji-json@2.0.0/dist/images/AR.svg",
  Armenia:
    "https://cdn.jsdelivr.net/npm/country-flag-emoji-json@2.0.0/dist/images/AM.svg",
  Aruba:
    "https://cdn.jsdelivr.net/npm/country-flag-emoji-json@2.0.0/dist/images/AW.svg",
  Australia:
    "https://cdn.jsdelivr.net/npm/country-flag-emoji-json@2.0.0/dist/images/AU.svg",
  Austria:
    "https://cdn.jsdelivr.net/npm/country-flag-emoji-json@2.0.0/dist/images/AT.svg",
  Azerbaijan:
    "https://cdn.jsdelivr.net/npm/country-flag-emoji-json@2.0.0/dist/images/AZ.svg",
  Bahrain:
    "https://cdn.jsdelivr.net/npm/country-flag-emoji-json@2.0.0/dist/images/BH.svg",
  Bahamas:
    "https://cdn.jsdelivr.net/npm/country-flag-emoji-json@2.0.0/dist/images/BS.svg",
  Bangladesh:
    "https://cdn.jsdelivr.net/npm/country-flag-emoji-json@2.0.0/dist/images/BD.svg",
  Barbados:
    "https://cdn.jsdelivr.net/npm/country-flag-emoji-json@2.0.0/dist/images/BB.svg",
  Belarus:
    "https://cdn.jsdelivr.net/npm/country-flag-emoji-json@2.0.0/dist/images/BY.svg",
  Belgium:
    "https://cdn.jsdelivr.net/npm/country-flag-emoji-json@2.0.0/dist/images/BE.svg",
  Belize:
    "https://cdn.jsdelivr.net/npm/country-flag-emoji-json@2.0.0/dist/images/BZ.svg",
  Benin:
    "https://cdn.jsdelivr.net/npm/country-flag-emoji-json@2.0.0/dist/images/BJ.svg",
  Bermuda:
    "https://cdn.jsdelivr.net/npm/country-flag-emoji-json@2.0.0/dist/images/BM.svg",
  Bhutan:
    "https://cdn.jsdelivr.net/npm/country-flag-emoji-json@2.0.0/dist/images/BT.svg",
  "Bolivia, Plurinational State of":
    "https://cdn.jsdelivr.net/npm/country-flag-emoji-json@2.0.0/dist/images/BO.svg",
  "Bonaire, Sint Eustatius and Saba":
    "https://cdn.jsdelivr.net/npm/country-flag-emoji-json@2.0.0/dist/images/BQ.svg",
  "Bosnia and Herzegovina":
    "https://cdn.jsdelivr.net/npm/country-flag-emoji-json@2.0.0/dist/images/BA.svg",
  Botswana:
    "https://cdn.jsdelivr.net/npm/country-flag-emoji-json@2.0.0/dist/images/BW.svg",
  "Bouvet Island":
    "https://cdn.jsdelivr.net/npm/country-flag-emoji-json@2.0.0/dist/images/BV.svg",
  Brazil:
    "https://cdn.jsdelivr.net/npm/country-flag-emoji-json@2.0.0/dist/images/BR.svg",
  "British Indian Ocean Territory":
    "https://cdn.jsdelivr.net/npm/country-flag-emoji-json@2.0.0/dist/images/IO.svg",
  "Brunei Darussalam":
    "https://cdn.jsdelivr.net/npm/country-flag-emoji-json@2.0.0/dist/images/BN.svg",
  Bulgaria:
    "https://cdn.jsdelivr.net/npm/country-flag-emoji-json@2.0.0/dist/images/BG.svg",
  "Burkina Faso":
    "https://cdn.jsdelivr.net/npm/country-flag-emoji-json@2.0.0/dist/images/BF.svg",
  Burundi:
    "https://cdn.jsdelivr.net/npm/country-flag-emoji-json@2.0.0/dist/images/BI.svg",
  Cambodia:
    "https://cdn.jsdelivr.net/npm/country-flag-emoji-json@2.0.0/dist/images/KH.svg",
  Cameroon:
    "https://cdn.jsdelivr.net/npm/country-flag-emoji-json@2.0.0/dist/images/CM.svg",
  Canada:
    "https://cdn.jsdelivr.net/npm/country-flag-emoji-json@2.0.0/dist/images/CA.svg",
  "Cape Verde":
    "https://cdn.jsdelivr.net/npm/country-flag-emoji-json@2.0.0/dist/images/CV.svg",
  "Cayman Islands":
    "https://cdn.jsdelivr.net/npm/country-flag-emoji-json@2.0.0/dist/images/KY.svg",
  "Central African Republic":
    "https://cdn.jsdelivr.net/npm/country-flag-emoji-json@2.0.0/dist/images/CF.svg",
  Chad: "https://cdn.jsdelivr.net/npm/country-flag-emoji-json@2.0.0/dist/images/TD.svg",
  Chile:
    "https://cdn.jsdelivr.net/npm/country-flag-emoji-json@2.0.0/dist/images/CL.svg",
  China:
    "https://cdn.jsdelivr.net/npm/country-flag-emoji-json@2.0.0/dist/images/CN.svg",
  "Christmas Island":
    "https://cdn.jsdelivr.net/npm/country-flag-emoji-json@2.0.0/dist/images/CX.svg",
  "Cocos (Keeling) Islands":
    "https://cdn.jsdelivr.net/npm/country-flag-emoji-json@2.0.0/dist/images/CC.svg",
  Colombia:
    "https://cdn.jsdelivr.net/npm/country-flag-emoji-json@2.0.0/dist/images/CO.svg",
  Comoros:
    "https://cdn.jsdelivr.net/npm/country-flag-emoji-json@2.0.0/dist/images/KM.svg",
  Congo:
    "https://cdn.jsdelivr.net/npm/country-flag-emoji-json@2.0.0/dist/images/CG.svg",
  "Congo, the Democratic Republic of the":
    "https://cdn.jsdelivr.net/npm/country-flag-emoji-json@2.0.0/dist/images/CD.svg",
  "Cook Islands":
    "https://cdn.jsdelivr.net/npm/country-flag-emoji-json@2.0.0/dist/images/CK.svg",
  "Costa Rica":
    "https://cdn.jsdelivr.net/npm/country-flag-emoji-json@2.0.0/dist/images/CR.svg",
  "Côte d'Ivoire":
    "https://cdn.jsdelivr.net/npm/country-flag-emoji-json@2.0.0/dist/images/CI.svg",
  Croatia:
    "https://cdn.jsdelivr.net/npm/country-flag-emoji-json@2.0.0/dist/images/HR.svg",
  Cuba: "https://cdn.jsdelivr.net/npm/country-flag-emoji-json@2.0.0/dist/images/CU.svg",
  Curaçao:
    "https://cdn.jsdelivr.net/npm/country-flag-emoji-json@2.0.0/dist/images/CW.svg",
  Cyprus:
    "https://cdn.jsdelivr.net/npm/country-flag-emoji-json@2.0.0/dist/images/CY.svg",
  "Czech Republic":
    "https://cdn.jsdelivr.net/npm/country-flag-emoji-json@2.0.0/dist/images/CZ.svg",
  Denmark:
    "https://cdn.jsdelivr.net/npm/country-flag-emoji-json@2.0.0/dist/images/DK.svg",
  Djibouti:
    "https://cdn.jsdelivr.net/npm/country-flag-emoji-json@2.0.0/dist/images/DJ.svg",
  Dominica:
    "https://cdn.jsdelivr.net/npm/country-flag-emoji-json@2.0.0/dist/images/DM.svg",
  "Dominican Republic":
    "https://cdn.jsdelivr.net/npm/country-flag-emoji-json@2.0.0/dist/images/DO.svg",
  Ecuador:
    "https://cdn.jsdelivr.net/npm/country-flag-emoji-json@2.0.0/dist/images/EC.svg",
  Egypt:
    "https://cdn.jsdelivr.net/npm/country-flag-emoji-json@2.0.0/dist/images/EG.svg",
  "El Salvador":
    "https://cdn.jsdelivr.net/npm/country-flag-emoji-json@2.0.0/dist/images/SV.svg",
  "Equatorial Guinea":
    "https://cdn.jsdelivr.net/npm/country-flag-emoji-json@2.0.0/dist/images/GQ.svg",
  Eritrea:
    "https://cdn.jsdelivr.net/npm/country-flag-emoji-json@2.0.0/dist/images/ER.svg",
  Estonia:
    "https://cdn.jsdelivr.net/npm/country-flag-emoji-json@2.0.0/dist/images/EE.svg",
  Ethiopia:
    "https://cdn.jsdelivr.net/npm/country-flag-emoji-json@2.0.0/dist/images/ET.svg",
  "Falkland Islands (Malvinas)":
    "https://cdn.jsdelivr.net/npm/country-flag-emoji-json@2.0.0/dist/images/FK.svg",
  "Faroe Islands":
    "https://cdn.jsdelivr.net/npm/country-flag-emoji-json@2.0.0/dist/images/FO.svg",
  Fiji: "https://cdn.jsdelivr.net/npm/country-flag-emoji-json@2.0.0/dist/images/FJ.svg",
  Finland:
    "https://cdn.jsdelivr.net/npm/country-flag-emoji-json@2.0.0/dist/images/FI.svg",
  France:
    "https://cdn.jsdelivr.net/npm/country-flag-emoji-json@2.0.0/dist/images/FR.svg",
  "French Guiana":
    "https://cdn.jsdelivr.net/npm/country-flag-emoji-json@2.0.0/dist/images/GF.svg",
  "French Polynesia":
    "https://cdn.jsdelivr.net/npm/country-flag-emoji-json@2.0.0/dist/images/PF.svg",
  "French Southern Territories":
    "https://cdn.jsdelivr.net/npm/country-flag-emoji-json@2.0.0/dist/images/TF.svg",
  Gabon:
    "https://cdn.jsdelivr.net/npm/country-flag-emoji-json@2.0.0/dist/images/GA.svg",
  Gambia:
    "https://cdn.jsdelivr.net/npm/country-flag-emoji-json@2.0.0/dist/images/GM.svg",
  Georgia:
    "https://cdn.jsdelivr.net/npm/country-flag-emoji-json@2.0.0/dist/images/GE.svg",
  Germany:
    "https://cdn.jsdelivr.net/npm/country-flag-emoji-json@2.0.0/dist/images/DE.svg",
  Ghana:
    "https://cdn.jsdelivr.net/npm/country-flag-emoji-json@2.0.0/dist/images/GH.svg",
  Gibraltar:
    "https://cdn.jsdelivr.net/npm/country-flag-emoji-json@2.0.0/dist/images/GI.svg",
  Greece:
    "https://cdn.jsdelivr.net/npm/country-flag-emoji-json@2.0.0/dist/images/GR.svg",
  Greenland:
    "https://cdn.jsdelivr.net/npm/country-flag-emoji-json@2.0.0/dist/images/GL.svg",
  Grenada:
    "https://cdn.jsdelivr.net/npm/country-flag-emoji-json@2.0.0/dist/images/GD.svg",
  Guadeloupe:
    "https://cdn.jsdelivr.net/npm/country-flag-emoji-json@2.0.0/dist/images/GP.svg",
  Guam: "https://cdn.jsdelivr.net/npm/country-flag-emoji-json@2.0.0/dist/images/GU.svg",
  Guatemala:
    "https://cdn.jsdelivr.net/npm/country-flag-emoji-json@2.0.0/dist/images/GT.svg",
  Guernsey:
    "https://cdn.jsdelivr.net/npm/country-flag-emoji-json@2.0.0/dist/images/GG.svg",
  Guinea:
    "https://cdn.jsdelivr.net/npm/country-flag-emoji-json@2.0.0/dist/images/GN.svg",
  "Guinea-Bissau":
    "https://cdn.jsdelivr.net/npm/country-flag-emoji-json@2.0.0/dist/images/GW.svg",
  Guyana:
    "https://cdn.jsdelivr.net/npm/country-flag-emoji-json@2.0.0/dist/images/GY.svg",
  Haiti:
    "https://cdn.jsdelivr.net/npm/country-flag-emoji-json@2.0.0/dist/images/HT.svg",
  "Heard Island and McDonald Islands":
    "https://cdn.jsdelivr.net/npm/country-flag-emoji-json@2.0.0/dist/images/HM.svg",
  "Holy See (Vatican City State)":
    "https://cdn.jsdelivr.net/npm/country-flag-emoji-json@2.0.0/dist/images/VA.svg",
  Honduras:
    "https://cdn.jsdelivr.net/npm/country-flag-emoji-json@2.0.0/dist/images/HN.svg",
  "Hong Kong":
    "https://cdn.jsdelivr.net/npm/country-flag-emoji-json@2.0.0/dist/images/HK.svg",
  Hungary:
    "https://cdn.jsdelivr.net/npm/country-flag-emoji-json@2.0.0/dist/images/HU.svg",
  Iceland:
    "https://cdn.jsdelivr.net/npm/country-flag-emoji-json@2.0.0/dist/images/IS.svg",
  India:
    "https://cdn.jsdelivr.net/npm/country-flag-emoji-json@2.0.0/dist/images/IN.svg",
  Indonesia:
    "https://cdn.jsdelivr.net/npm/country-flag-emoji-json@2.0.0/dist/images/ID.svg",
  "Iran, Islamic Republic of":
    "https://cdn.jsdelivr.net/npm/country-flag-emoji-json@2.0.0/dist/images/IR.svg",
  Iraq: "https://cdn.jsdelivr.net/npm/country-flag-emoji-json@2.0.0/dist/images/IQ.svg",
  Ireland:
    "https://cdn.jsdelivr.net/npm/country-flag-emoji-json@2.0.0/dist/images/IE.svg",
  "Isle of Man":
    "https://cdn.jsdelivr.net/npm/country-flag-emoji-json@2.0.0/dist/images/IM.svg",
  Israel:
    "https://cdn.jsdelivr.net/npm/country-flag-emoji-json@2.0.0/dist/images/IL.svg",
  Italy:
    "https://cdn.jsdelivr.net/npm/country-flag-emoji-json@2.0.0/dist/images/IT.svg",
  Jamaica:
    "https://cdn.jsdelivr.net/npm/country-flag-emoji-json@2.0.0/dist/images/JM.svg",
  Japan:
    "https://cdn.jsdelivr.net/npm/country-flag-emoji-json@2.0.0/dist/images/JP.svg",
  Jersey:
    "https://cdn.jsdelivr.net/npm/country-flag-emoji-json@2.0.0/dist/images/JE.svg",
  Jordan:
    "https://cdn.jsdelivr.net/npm/country-flag-emoji-json@2.0.0/dist/images/JO.svg",
  Kazakhstan:
    "https://cdn.jsdelivr.net/npm/country-flag-emoji-json@2.0.0/dist/images/KZ.svg",
  Kenya:
    "https://cdn.jsdelivr.net/npm/country-flag-emoji-json@2.0.0/dist/images/KE.svg",
  Kiribati:
    "https://cdn.jsdelivr.net/npm/country-flag-emoji-json@2.0.0/dist/images/KI.svg",
  "Korea, Democratic People's Republic of":
    "https://cdn.jsdelivr.net/npm/country-flag-emoji-json@2.0.0/dist/images/KP.svg",
  "Korea, Republic of":
    "https://cdn.jsdelivr.net/npm/country-flag-emoji-json@2.0.0/dist/images/KR.svg",
  Kuwait:
    "https://cdn.jsdelivr.net/npm/country-flag-emoji-json@2.0.0/dist/images/KW.svg",
  Kyrgyzstan:
    "https://cdn.jsdelivr.net/npm/country-flag-emoji-json@2.0.0/dist/images/KG.svg",
  "Lao People's Democratic Republic":
    "https://cdn.jsdelivr.net/npm/country-flag-emoji-json@2.0.0/dist/images/LA.svg",
  Latvia:
    "https://cdn.jsdelivr.net/npm/country-flag-emoji-json@2.0.0/dist/images/LV.svg",
  Lebanon:
    "https://cdn.jsdelivr.net/npm/country-flag-emoji-json@2.0.0/dist/images/LB.svg",
  Lesotho:
    "https://cdn.jsdelivr.net/npm/country-flag-emoji-json@2.0.0/dist/images/LS.svg",
  Liberia:
    "https://cdn.jsdelivr.net/npm/country-flag-emoji-json@2.0.0/dist/images/LR.svg",
  Libya:
    "https://cdn.jsdelivr.net/npm/country-flag-emoji-json@2.0.0/dist/images/LY.svg",
  Liechtenstein:
    "https://cdn.jsdelivr.net/npm/country-flag-emoji-json@2.0.0/dist/images/LI.svg",
  Lithuania:
    "https://cdn.jsdelivr.net/npm/country-flag-emoji-json@2.0.0/dist/images/LT.svg",
  Luxembourg:
    "https://cdn.jsdelivr.net/npm/country-flag-emoji-json@2.0.0/dist/images/LU.svg",
  Macao:
    "https://cdn.jsdelivr.net/npm/country-flag-emoji-json@2.0.0/dist/images/MO.svg",
  "Macedonia, the Former Yugoslav Republic of":
    "https://cdn.jsdelivr.net/npm/country-flag-emoji-json@2.0.0/dist/images/MK.svg",
  Madagascar:
    "https://cdn.jsdelivr.net/npm/country-flag-emoji-json@2.0.0/dist/images/MG.svg",
  Malawi:
    "https://cdn.jsdelivr.net/npm/country-flag-emoji-json@2.0.0/dist/images/MW.svg",
  Malaysia:
    "https://cdn.jsdelivr.net/npm/country-flag-emoji-json@2.0.0/dist/images/MY.svg",
  Maldives:
    "https://cdn.jsdelivr.net/npm/country-flag-emoji-json@2.0.0/dist/images/MV.svg",
  Mali: "https://cdn.jsdelivr.net/npm/country-flag-emoji-json@2.0.0/dist/images/ML.svg",
  Malta:
    "https://cdn.jsdelivr.net/npm/country-flag-emoji-json@2.0.0/dist/images/MT.svg",
  "Marshall Islands":
    "https://cdn.jsdelivr.net/npm/country-flag-emoji-json@2.0.0/dist/images/MH.svg",
  Martinique:
    "https://cdn.jsdelivr.net/npm/country-flag-emoji-json@2.0.0/dist/images/MQ.svg",
  Mauritania:
    "https://cdn.jsdelivr.net/npm/country-flag-emoji-json@2.0.0/dist/images/MR.svg",
  Mauritius:
    "https://cdn.jsdelivr.net/npm/country-flag-emoji-json@2.0.0/dist/images/MU.svg",
  Mayotte:
    "https://cdn.jsdelivr.net/npm/country-flag-emoji-json@2.0.0/dist/images/YT.svg",
  Mexico:
    "https://cdn.jsdelivr.net/npm/country-flag-emoji-json@2.0.0/dist/images/MX.svg",
  "Micronesia, Federated States of":
    "https://cdn.jsdelivr.net/npm/country-flag-emoji-json@2.0.0/dist/images/FM.svg",
  "Moldova, Republic of":
    "https://cdn.jsdelivr.net/npm/country-flag-emoji-json@2.0.0/dist/images/MD.svg",
  Monaco:
    "https://cdn.jsdelivr.net/npm/country-flag-emoji-json@2.0.0/dist/images/MC.svg",
  Mongolia:
    "https://cdn.jsdelivr.net/npm/country-flag-emoji-json@2.0.0/dist/images/MN.svg",
  Montenegro:
    "https://cdn.jsdelivr.net/npm/country-flag-emoji-json@2.0.0/dist/images/ME.svg",
  Montserrat:
    "https://cdn.jsdelivr.net/npm/country-flag-emoji-json@2.0.0/dist/images/MS.svg",
  Morocco:
    "https://cdn.jsdelivr.net/npm/country-flag-emoji-json@2.0.0/dist/images/MA.svg",
  Mozambique:
    "https://cdn.jsdelivr.net/npm/country-flag-emoji-json@2.0.0/dist/images/MZ.svg",
  Myanmar:
    "https://cdn.jsdelivr.net/npm/country-flag-emoji-json@2.0.0/dist/images/MM.svg",
  Namibia:
    "https://cdn.jsdelivr.net/npm/country-flag-emoji-json@2.0.0/dist/images/NA.svg",
  Nauru:
    "https://cdn.jsdelivr.net/npm/country-flag-emoji-json@2.0.0/dist/images/NR.svg",
  Nepal:
    "https://cdn.jsdelivr.net/npm/country-flag-emoji-json@2.0.0/dist/images/NP.svg",
  Netherlands:
    "https://cdn.jsdelivr.net/npm/country-flag-emoji-json@2.0.0/dist/images/NL.svg",
  "New Caledonia":
    "https://cdn.jsdelivr.net/npm/country-flag-emoji-json@2.0.0/dist/images/NC.svg",
  " New Zealand":
    "https://cdn.jsdelivr.net/npm/country-flag-emoji-json@2.0.0/dist/images/NZ.svg",
  Nicaragua:
    "https://cdn.jsdelivr.net/npm/country-flag-emoji-json@2.0.0/dist/images/NI.svg",
  Niger:
    "https://cdn.jsdelivr.net/npm/country-flag-emoji-json@2.0.0/dist/images/NE.svg",
  Nigeria:
    "https://cdn.jsdelivr.net/npm/country-flag-emoji-json@2.0.0/dist/images/NG.svg",
  Niue: "https://cdn.jsdelivr.net/npm/country-flag-emoji-json@2.0.0/dist/images/NU.svg",
  "Norfolk Island":
    "https://cdn.jsdelivr.net/npm/country-flag-emoji-json@2.0.0/dist/images/NF.svg",
  "Northern Mariana Islands":
    "https://cdn.jsdelivr.net/npm/country-flag-emoji-json@2.0.0/dist/images/MP.svg",
  Norway:
    "https://cdn.jsdelivr.net/npm/country-flag-emoji-json@2.0.0/dist/images/NO.svg",
  Oman: "https://cdn.jsdelivr.net/npm/country-flag-emoji-json@2.0.0/dist/images/OM.svg",
  Pakistan:
    "https://cdn.jsdelivr.net/npm/country-flag-emoji-json@2.0.0/dist/images/PK.svg",
  Palau:
    "https://cdn.jsdelivr.net/npm/country-flag-emoji-json@2.0.0/dist/images/PW.svg",
  "Palestine, State of":
    "https://cdn.jsdelivr.net/npm/country-flag-emoji-json@2.0.0/dist/images/PS.svg",
  Panama:
    "https://cdn.jsdelivr.net/npm/country-flag-emoji-json@2.0.0/dist/images/PA.svg",
  "Papua New Guinea":
    "https://cdn.jsdelivr.net/npm/country-flag-emoji-json@2.0.0/dist/images/PG.svg",
  Paraguay:
    "https://cdn.jsdelivr.net/npm/country-flag-emoji-json@2.0.0/dist/images/PY.svg",
  Peru: "https://cdn.jsdelivr.net/npm/country-flag-emoji-json@2.0.0/dist/images/PE.svg",
  Philippines:
    "https://cdn.jsdelivr.net/npm/country-flag-emoji-json@2.0.0/dist/images/PH.svg",
  Pitcairn:
    "https://cdn.jsdelivr.net/npm/country-flag-emoji-json@2.0.0/dist/images/PN.svg",
  Poland:
    "https://cdn.jsdelivr.net/npm/country-flag-emoji-json@2.0.0/dist/images/PL.svg",
  Portugal:
    "https://cdn.jsdelivr.net/npm/country-flag-emoji-json@2.0.0/dist/images/PT.svg",
  "Puerto Rico":
    "https://cdn.jsdelivr.net/npm/country-flag-emoji-json@2.0.0/dist/images/PR.svg",
  Qatar:
    "https://cdn.jsdelivr.net/npm/country-flag-emoji-json@2.0.0/dist/images/QA.svg",
  Réunion:
    "https://cdn.jsdelivr.net/npm/country-flag-emoji-json@2.0.0/dist/images/RE.svg",
  Romania:
    "https://cdn.jsdelivr.net/npm/country-flag-emoji-json@2.0.0/dist/images/RO.svg",
  "Russian Federation":
    "https://cdn.jsdelivr.net/npm/country-flag-emoji-json@2.0.0/dist/images/RU.svg",
  Rwanda:
    "https://cdn.jsdelivr.net/npm/country-flag-emoji-json@2.0.0/dist/images/RW.svg",
  "Saint Barthélemy":
    "https://cdn.jsdelivr.net/npm/country-flag-emoji-json@2.0.0/dist/images/BL.svg",
  "Saint Helena, Ascension and Tristan da Cunha":
    "https://cdn.jsdelivr.net/npm/country-flag-emoji-json@2.0.0/dist/images/SH.svg",
  "Saint Kitts and Nevis":
    "https://cdn.jsdelivr.net/npm/country-flag-emoji-json@2.0.0/dist/images/KN.svg",
  "Saint Lucia":
    "https://cdn.jsdelivr.net/npm/country-flag-emoji-json@2.0.0/dist/images/LC.svg",
  "Saint Martin (French part)":
    "https://cdn.jsdelivr.net/npm/country-flag-emoji-json@2.0.0/dist/images/MF.svg",
  "Saint Pierre and Miquelon":
    "https://cdn.jsdelivr.net/npm/country-flag-emoji-json@2.0.0/dist/images/PM.svg",
  "Saint Vincent and the Grenadines":
    "https://cdn.jsdelivr.net/npm/country-flag-emoji-json@2.0.0/dist/images/VC.svg",
  Samoa:
    "https://cdn.jsdelivr.net/npm/country-flag-emoji-json@2.0.0/dist/images/WS.svg",
  "San Marino	":
    "https://cdn.jsdelivr.net/npm/country-flag-emoji-json@2.0.0/dist/images/SM.svg",
  "Sao Tome and Principe":
    "https://cdn.jsdelivr.net/npm/country-flag-emoji-json@2.0.0/dist/images/ST.svg",
  "Saudi Arabia":
    "https://cdn.jsdelivr.net/npm/country-flag-emoji-json@2.0.0/dist/images/SA.svg",
  Senegal:
    "https://cdn.jsdelivr.net/npm/country-flag-emoji-json@2.0.0/dist/images/SN.svg",
  Serbia:
    "https://cdn.jsdelivr.net/npm/country-flag-emoji-json@2.0.0/dist/images/RS.svg",
  Seychelles:
    "https://cdn.jsdelivr.net/npm/country-flag-emoji-json@2.0.0/dist/images/SC.svg",
  "Sierra Leone":
    "https://cdn.jsdelivr.net/npm/country-flag-emoji-json@2.0.0/dist/images/SL.svg",
  Singapore:
    "https://cdn.jsdelivr.net/npm/country-flag-emoji-json@2.0.0/dist/images/SG.svg",
  "Sint Maarten (Dutch part)":
    "https://cdn.jsdelivr.net/npm/country-flag-emoji-json@2.0.0/dist/images/SX.svg",
  Slovakia:
    "https://cdn.jsdelivr.net/npm/country-flag-emoji-json@2.0.0/dist/images/SK.svg",
  Slovenia:
    "https://cdn.jsdelivr.net/npm/country-flag-emoji-json@2.0.0/dist/images/SI.svg",
  "Solomon Islands":
    "https://cdn.jsdelivr.net/npm/country-flag-emoji-json@2.0.0/dist/images/SB.svg",
  Somalia:
    "https://cdn.jsdelivr.net/npm/country-flag-emoji-json@2.0.0/dist/images/SO.svg",
  "South Africa":
    "https://cdn.jsdelivr.net/npm/country-flag-emoji-json@2.0.0/dist/images/ZA.svg",
  "South Georgia and the South Sandwich Islands":
    "https://cdn.jsdelivr.net/npm/country-flag-emoji-json@2.0.0/dist/images/GS.svg",
  "South Sudan":
    "https://cdn.jsdelivr.net/npm/country-flag-emoji-json@2.0.0/dist/images/SS.svg",
  Spain:
    "https://cdn.jsdelivr.net/npm/country-flag-emoji-json@2.0.0/dist/images/ES.svg",
  "Sri Lanka":
    "https://cdn.jsdelivr.net/npm/country-flag-emoji-json@2.0.0/dist/images/LK.svg",
  Sudan:
    "https://cdn.jsdelivr.net/npm/country-flag-emoji-json@2.0.0/dist/images/SD.svg",
  Suriname:
    "https://cdn.jsdelivr.net/npm/country-flag-emoji-json@2.0.0/dist/images/SR.svg",
  "Svalbard and Jan Mayen":
    "https://cdn.jsdelivr.net/npm/country-flag-emoji-json@2.0.0/dist/images/SJ.svg",
  Swaziland:
    "https://cdn.jsdelivr.net/npm/country-flag-emoji-json@2.0.0/dist/images/SZ.svg",
  Sweden:
    "https://cdn.jsdelivr.net/npm/country-flag-emoji-json@2.0.0/dist/images/SE.svg",
  Switzerland:
    "https://cdn.jsdelivr.net/npm/country-flag-emoji-json@2.0.0/dist/images/CH.svg",
  "Syrian Arab Republic":
    "https://cdn.jsdelivr.net/npm/country-flag-emoji-json@2.0.0/dist/images/SY.svg",
  "Taiwan, Province of China":
    "https://cdn.jsdelivr.net/npm/country-flag-emoji-json@2.0.0/dist/images/TW.svg",
  Tajikistan:
    "https://cdn.jsdelivr.net/npm/country-flag-emoji-json@2.0.0/dist/images/TJ.svg",
  "Tanzania, United Republic of":
    "https://cdn.jsdelivr.net/npm/country-flag-emoji-json@2.0.0/dist/images/TZ.svg",
  Thailand:
    "https://cdn.jsdelivr.net/npm/country-flag-emoji-json@2.0.0/dist/images/TH.svg",
  "Timor-Leste":
    "https://cdn.jsdelivr.net/npm/country-flag-emoji-json@2.0.0/dist/images/TL.svg",
  Togo: "https://cdn.jsdelivr.net/npm/country-flag-emoji-json@2.0.0/dist/images/TG.svg",
  Tokelau:
    "https://cdn.jsdelivr.net/npm/country-flag-emoji-json@2.0.0/dist/images/TK.svg",
  Tonga:
    "https://cdn.jsdelivr.net/npm/country-flag-emoji-json@2.0.0/dist/images/TO.svg",
  "Trinidad and Tobago":
    "https://cdn.jsdelivr.net/npm/country-flag-emoji-json@2.0.0/dist/images/TT.svg",
  Tunisia:
    "https://cdn.jsdelivr.net/npm/country-flag-emoji-json@2.0.0/dist/images/TN.svg",
  Turkey:
    "https://cdn.jsdelivr.net/npm/country-flag-emoji-json@2.0.0/dist/images/TR.svg",
  Turkmenistan:
    "https://cdn.jsdelivr.net/npm/country-flag-emoji-json@2.0.0/dist/images/TM.svg",
  "Turks and Caicos Islands":
    "https://cdn.jsdelivr.net/npm/country-flag-emoji-json@2.0.0/dist/images/TC.svg",
  Tuvalu:
    "https://cdn.jsdelivr.net/npm/country-flag-emoji-json@2.0.0/dist/images/TV.svg",
  Uganda:
    "https://cdn.jsdelivr.net/npm/country-flag-emoji-json@2.0.0/dist/images/UG.svg",
  Ukraine:
    "https://cdn.jsdelivr.net/npm/country-flag-emoji-json@2.0.0/dist/images/UA.svg",
  "United Arab Emirates":
    "https://cdn.jsdelivr.net/npm/country-flag-emoji-json@2.0.0/dist/images/AE.svg",
  "United Kingdom":
    "https://cdn.jsdelivr.net/npm/country-flag-emoji-json@2.0.0/dist/images/GB.svg",
  "United States":
    "https://cdn.jsdelivr.net/npm/country-flag-emoji-json@2.0.0/dist/images/US.svg",
  "United States Minor Outlying Islands":
    "https://cdn.jsdelivr.net/npm/country-flag-emoji-json@2.0.0/dist/images/UM.svg",
  Uruguay:
    "https://cdn.jsdelivr.net/npm/country-flag-emoji-json@2.0.0/dist/images/UY.svg",
  Uzbekistan:
    "https://cdn.jsdelivr.net/npm/country-flag-emoji-json@2.0.0/dist/images/UZ.svg",
  Vanuatu:
    "https://cdn.jsdelivr.net/npm/country-flag-emoji-json@2.0.0/dist/images/VU.svg",
  "Venezuela, Bolivarian Republic of":
    "https://cdn.jsdelivr.net/npm/country-flag-emoji-json@2.0.0/dist/images/VE.svg",
  "VietNam":
    "https://cdn.jsdelivr.net/npm/country-flag-emoji-json@2.0.0/dist/images/VN.svg",
  "Virgin Islands, British":
    "https://cdn.jsdelivr.net/npm/country-flag-emoji-json@2.0.0/dist/images/VG.svg",
  "Virgin Islands, U.S":
    "https://cdn.jsdelivr.net/npm/country-flag-emoji-json@2.0.0/dist/images/VI.svg",
  "Wallis and Futuna":
    "https://cdn.jsdelivr.net/npm/country-flag-emoji-json@2.0.0/dist/images/WF.svg",
  "Western Sahara":
    "https://cdn.jsdelivr.net/npm/country-flag-emoji-json@2.0.0/dist/images/EH.svg",
  Yemen:
    "https://cdn.jsdelivr.net/npm/country-flag-emoji-json@2.0.0/dist/images/YE.svg",
  Zambia:
    "https://cdn.jsdelivr.net/npm/country-flag-emoji-json@2.0.0/dist/images/ZM.svg",
  Zimbabwe:
    "https://cdn.jsdelivr.net/npm/country-flag-emoji-json@2.0.0/dist/images/ZW.svg",
};

var countryInp = document.querySelector(".country");
var stateInp = document.querySelector(".state");
var cityInp = document.querySelector(".city");
document.addEventListener("DOMContentLoaded", function () {
  instances = M.Autocomplete.init(countryInp, {
    limit: 5,
    data,
  });
  instances1 = M.Autocomplete.init(stateInp, {
    limit: 5,
    data: {},
  });
  instances2 = M.Autocomplete.init(cityInp, {
    limit: 5,
    data: {},
  });
});
let data1, object;
countryInp.addEventListener("change", async () => {
  if (data.hasOwnProperty(countryInp.value)) {
    countryE.style.display = "none";
    countryInp.classList.remove("is-invalid");
    submit.classList.remove("disabled");
  } else {
    countryE.style.display = "display";
    submit.classList.add("disabled");
    countryInp.classList.add("is-invalid");
  }
  stateInp.addEventListener("focusin", async () => {
    if (data.hasOwnProperty(countryInp.value)) {
      data1 = await axios.post(
        "https://countriesnow.space/api/v0.1/countries/states",
        {
          country: countryInp.value,
        }
      );
      const dataList = data1.data.data.states;
      console.log(data1.data.data.states);

      cityData = dataList.reduce(
        (obj, item) => ((obj[item.name] = null), obj),
        {}
      );
      instances1.updateData(cityData);
    }
  });
  let data2;
  cityInp.addEventListener("focusin", async () => {
    if (stateInp.value in cityData) {
      data2 = await axios.post(
        "https://countriesnow.space/api/v0.1/countries/state/cities",
        {
          country: countryInp.value,
          state: stateInp.value,
        }
      );
      console.log(data2.data.data);
      const dataList = data2.data.data;

      cityData2 = dataList.reduce((obj, item) => ((obj[item] = null), obj), {});
      instances2.updateData(cityData2);
    }
  });
  stateInp.addEventListener("change", async () => {
    if (stateInp.value in cityData) {
      stateE.style.display = "none";
      stateInp.classList.remove("is-invalid");
      submit.classList.remove("disabled");
    } else {
      stateE.style.display = "block";
      stateInp.classList.add("is-invalid");
      submit.classList.add("disabled");
    }
  });
  cityInp.addEventListener("change", async () => {
    if (cityInp.value in cityData2) {
      cityInp.classList.remove("is-invalid");
      submit.classList.remove("disabled");
    } else {
      cityInp.classList.add("is-invalid");
      submit.classList.add("disabled");
    }
  });
});
