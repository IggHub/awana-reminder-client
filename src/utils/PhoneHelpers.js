function condensePhone(s){
  var s2 = (s+"").replace(/\D/g, '');
    return s2;
};

const PhoneHelper = {condensePhone};

export default PhoneHelper;
