
const sensitiveFields = {
  EMAIL: 'email',
  FIRST_NAME: 'first_name',
  LAST_NAME: 'last_name',
  MOBILE_NUMBER: 'mobile_number',
  CONTACT_NUMBER: 'contact_number',
  ADDRESS_LINE_1: 'address_line_1',
  ADDRESS_LINE_2: 'address_line_2',

};
const removeableFields = {
  PASSWORD: 'password',
  IDENTITY_NUMBER: 'identity_number',
};

const redactSubmittedParams = (objectToRedact) => {
  if (!objectToRedact) return objectToRedact;
  const semiRedactedKeyConfig = Object.values(sensitiveFields);
  const completeRedactConfig = Object.values(removeableFields);

  const redactedObject = objectToRedact;
  Object.keys(objectToRedact).forEach((key) => {
    if (semiRedactedKeyConfig.includes(key)) {
      if (objectToRedact[key].length <= 1) return;
      const keyToObscure = key;
      const valueToObscure = objectToRedact[key];
      const censored = valueToObscure.slice(0, 2) + '*'.repeat(valueToObscure.length - 3) + valueToObscure.slice(-2);
      redactedObject[keyToObscure] = censored;
    }
    if (completeRedactConfig.includes(key)) {
      if (objectToRedact[key].length <= 1) return;
      const keyToObscure = key;
      const censored = '*'.repeat(4);
      redactedObject[keyToObscure] = censored;
    }
    if (typeof objectToRedact[key] === 'object') {
      redactSubmittedParams(objectToRedact[key]);
    }
  });

  return redactedObject;
};

module.exports = redactSubmittedParams;
