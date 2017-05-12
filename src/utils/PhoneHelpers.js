function condensePhone(s){
  var s2 = (s+"").replace(/\D/g, '');
    return "+1" + s2;
};

const PhoneHelper = {condensePhone};

export default PhoneHelper;
