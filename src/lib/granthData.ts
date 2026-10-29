export interface GranthItem {
  id: string;
  titleHindi: string;
  titleEnglish: string;
  description: string;
  versesCount: string;
  language: string;
  coverImage?: string;
  pdfLink: string;
  pdfFilePath: string;
}

export const ALL_UPLOADED_GRANTHS: GranthItem[] = [
  {
    id: "granth-01",
    titleHindi: "आचारसार",
    titleEnglish: "Acharsar 2026",
    versesCount: "741 पृष्ठ",
    language: "संस्कृत / हिंदी",
    description: "परम पूज्य मुनि श्री सुवन्द्य सागर जी महाराज द्वारा आचारसार ग्रंथ पर विशेष स्वाध्याय, आचार संहिता एवं मुनिचर्या का विस्तृत विवेचन।",
    pdfLink: "/granth/ACHARSAR%202026.pdf",
    pdfFilePath: "/granth/ACHARSAR%202026.pdf"
  },
  {
    id: "granth-02",
    titleHindi: "अमितगति श्रावकाचार",
    titleEnglish: "Amitgati Shravakachar",
    versesCount: "312 पृष्ठ",
    language: "संस्कृत / हिंदी",
    description: "आचार्य अमितगति कृत श्रावकाचार पर मुनि श्री सुवन्द्य सागर जी की प्रामाणिक टीका व श्रावक धर्म का संपूर्ण मार्गदर्शन।",
    pdfLink: "/granth/Amitgati%20Shravakachar.pdf",
    pdfFilePath: "/granth/Amitgati%20Shravakachar.pdf"
  },
  {
    id: "granth-03",
    titleHindi: "अनूठे प्रवचन",
    titleEnglish: "Anoothe Pravachan",
    versesCount: "32 पृष्ठ",
    language: "हिंदी",
    description: "मुनि श्री सुवन्द्य सागर जी महाराज के आध्यात्मिक एवं प्रेरक अमृत वचनों और जीवन निर्माण के पावन सूत्रों का संग्रह।",
    pdfLink: "/granth/Anoothe%20Pravachan.pdf",
    pdfFilePath: "/granth/Anoothe%20Pravachan.pdf"
  },
  {
    id: "granth-04",
    titleHindi: "बाहुबली चरित्र (2025)",
    titleEnglish: "Bahubali Charitra June 2025",
    versesCount: "144 पृष्ठ",
    language: "हिंदी",
    description: "कामदेव प्रथम मोक्षगामी भगवान बाहुबली के पावन जीवन, त्याग, तपस्या और कैवल्य प्राप्ति की पावन गाथा।",
    pdfLink: "/granth/Bahubali%20Charitra%20June%202025.pdf",
    pdfFilePath: "/granth/Bahubali%20Charitra%20June%202025.pdf"
  },
  {
    id: "granth-05",
    titleHindi: "बाहुबली चरित्र (प्रथम संस्करण)",
    titleEnglish: "Bahubali Charitra",
    versesCount: "128 पृष्ठ",
    language: "हिंदी",
    description: "भगवान बाहुबली स्वामी के अनुपम वैराग्य, अहंकार विजय और केवलज्ञान का भावपूर्ण जीवन चरित्र।",
    pdfLink: "/granth/Bahubali%20Charitra.pdf",
    pdfFilePath: "/granth/Bahubali%20Charitra.pdf"
  },
  {
    id: "granth-06",
    titleHindi: "भद्रबाहु कथा",
    titleEnglish: "Bhadrabahu Katha",
    versesCount: "231 पृष्ठ",
    language: "हिंदी",
    description: "अंतिम श्रुतकेवली भगवान भद्रबाहु स्वामी एवं सम्राट चंद्रगुप्त मुनि की ऐतिहासिक एवं वैराग्यमयी अमर गाथा।",
    pdfLink: "/granth/Bhadrabahu%20katha.pdf",
    pdfFilePath: "/granth/Bhadrabahu%20katha.pdf"
  },
  {
    id: "granth-07",
    titleHindi: "बिखरे मोती",
    titleEnglish: "Bikhare Motee",
    versesCount: "64 पृष्ठ",
    language: "हिंदी",
    description: "जीवन को नई दिशा, आत्म-शांति और सकारात्मक सोच प्रदान करने वाले अनमोल आध्यात्मिक विचारों का संकलन।",
    pdfLink: "/granth/Bikhare%20Motee%203rd%20Edn%202020.pdf",
    pdfFilePath: "/granth/Bikhare%20Motee%203rd%20Edn%202020.pdf"
  },
  {
    id: "granth-08",
    titleHindi: "धर्म क्या है?",
    titleEnglish: "Dharma Kya Hai?",
    versesCount: "112 पृष्ठ",
    language: "हिंदी",
    description: "धर्म के वास्तविक आत्मिक स्वरूप, अहिंसा, दया और व्यावहारिक जीवन में धर्म के सच्चे महत्व का सरल व मार्मिक विवेचन।",
    pdfLink: "/granth/DKH_2025.pdf",
    pdfFilePath: "/granth/DKH_2025.pdf"
  },
  {
    id: "granth-09",
    titleHindi: "धर्म की सरिता",
    titleEnglish: "Dharma Ki Sarita",
    versesCount: "100 पृष्ठ",
    language: "हिंदी",
    description: "गुरु महिमा, वीरसासन जयंती, कृतज्ञता एवं मधुर संवाद जैसे विषयों पर मुनि श्री के प्रेरक प्रवचनों की अमृत धारा।",
    pdfLink: "/granth/DKS%202022.pdf",
    pdfFilePath: "/granth/DKS%202022.pdf"
  },
  {
    id: "granth-10",
    titleHindi: "दीपक ज्योति तिमिर क्षयकार",
    titleEnglish: "Deepak Jyoti",
    versesCount: "200 पृष्ठ",
    language: "हिंदी",
    description: "आचार्य अमितगति कृत मिथ्यात्व-सम्यक्त्व निरूपण पर मुनि श्री सुवन्द्य सागर जी महाराज की प्रांजल हिंदी टीका।",
    pdfLink: "/granth/Deepak%20Jyoti%20March%202023%20final.pdf",
    pdfFilePath: "/granth/Deepak%20Jyoti%20March%202023%20final.pdf"
  },
  {
    id: "granth-11",
    titleHindi: "धन्य मुनिचर्या!",
    titleEnglish: "Dhanya Municharya",
    versesCount: "72 पृष्ठ",
    language: "हिंदी",
    description: "दिगंबर जैन मुनियों के 28 मूलगुण, महाव्रत एवं आत्म-कल्याणकारी कठिन तप-साधना का प्रामाणिक व भावपूर्ण दिग्दर्शन।",
    pdfLink: "/granth/Dhanya%20Municharya%204th%20Edn%202020.pdf",
    pdfFilePath: "/granth/Dhanya%20Municharya%204th%20Edn%202020.pdf"
  },
  {
    id: "granth-12",
    titleHindi: "दिगम्बरत्व का रहस्य (हिंदी)",
    titleEnglish: "Digambar Rahasya (Hindi)",
    versesCount: "74 पृष्ठ",
    language: "हिंदी",
    description: "दिगंबर मुनि अवस्था, अपरिग्रह, वीतराग मुद्रा और आत्म-शुद्धि के गूढ़ आध्यात्मिक रहस्यों का उद्घाटन।",
    pdfLink: "/granth/Digambar%20Rahasya%20-Hindi.pdf",
    pdfFilePath: "/granth/Digambar%20Rahasya%20-Hindi.pdf"
  },
  {
    id: "granth-13",
    titleHindi: "दिगंबरत्वाचे रहस्य (मराठी)",
    titleEnglish: "Digambaratvache Rahasya (Marathi)",
    versesCount: "72 पृष्ठ",
    language: "मराठी",
    description: "निर्ग्रंथ दिगंबर मुनि परंपरेचे पावित्र्य, त्याग आणि आत्मिक तत्त्वज्ञानाचे मराठीतील प्रामाणिक विवेचन।",
    pdfLink: "/granth/Digambaratvache%20Rahasya.pdf",
    pdfFilePath: "/granth/Digambaratvache%20Rahasya.pdf"
  },
  {
    id: "granth-14",
    titleHindi: "गृहस्थों का परम धर्म (हिंदी)",
    titleEnglish: "Grihasthon Ka Param Dharma (Hindi)",
    versesCount: "152 पृष्ठ",
    language: "हिंदी",
    description: "श्रावक जीवन में आहारदान, दान के भेद, सुपात्र दान और गृहस्थ धर्म के कर्तव्यों का विस्तृत व शास्त्रीय मार्गदर्शक।",
    pdfLink: "/granth/GPD%20_Hindi_2025.pdf",
    pdfFilePath: "/granth/GPD%20_Hindi_2025.pdf"
  },
  {
    id: "granth-15",
    titleHindi: "गृहस्थांचा परम धर्म (मराठी)",
    titleEnglish: "Grihasthancha Param Dharma (Marathi)",
    versesCount: "152 पृष्ठ",
    language: "मराठी",
    description: "जैन श्रावकांसाठी आहारदान, मुनिभक्ती आणि गृहस्थ धर्माच्या श्रेष्ठ आचरणाचे मराठी भाषेत निरूपण।",
    pdfLink: "/granth/GPD%20_Marathi_2026.pdf",
    pdfFilePath: "/granth/GPD%20_Marathi_2026.pdf"
  },
  {
    id: "granth-16",
    titleHindi: "इंद्र चरित्र",
    titleEnglish: "Indra Charitra (Marathi)",
    versesCount: "34 पृष्ठ",
    language: "मराठी",
    description: "सौधर्म इंद्र, तीर्थंकर जन्माभिषेक एवं जिनभक्ति की पावन महिमा का मराठी भाषा में ओजस्वी चित्रण।",
    pdfLink: "/granth/Indra%20charitra%2020.pdf",
    pdfFilePath: "/granth/Indra%20charitra%2020.pdf"
  },
  {
    id: "granth-17",
    titleHindi: "जटायु की स्वर्गयात्रा",
    titleEnglish: "Jatayu Ki Swargyatra",
    versesCount: "96 पृष्ठ",
    language: "हिंदी",
    description: "जटायु पक्षी के पूर्वभव, सम्यग्दर्शन, मुनि सेवा एवं स्वर्ग गमन की रोमांचक व आत्म-कल्याणकारी गाथा।",
    pdfLink: "/granth/JATAU.pdf",
    pdfFilePath: "/granth/JATAU.pdf"
  },
  {
    id: "granth-18",
    titleHindi: "जिनाभिषेक एवं पूजन विचार",
    titleEnglish: "Jinabhishek Evam Pujan Vichar",
    versesCount: "91 पृष्ठ",
    language: "हिंदी",
    description: "भगवान जिनेंद्र के अभिषेक, अष्टद्रव्य पूजन एवं भक्ति क्रियाओं के शास्त्रीय विधि-विधान एवं दार्शनिक विचार।",
    pdfLink: "/granth/JPV%20SEP%202023.pdf",
    pdfFilePath: "/granth/JPV%20SEP%202023.pdf"
  },
  {
    id: "granth-19",
    titleHindi: "जिनवाणी कण्ठहार",
    titleEnglish: "Jinwani Kanthhar 2024",
    versesCount: "240 पृष्ठ",
    language: "संस्कृत / हिंदी",
    description: "नित्य स्वाध्याय, स्तोत्र, पाठ एवं जिनवाणी स्तुतियों का अत्यंत उपयोगी व कंठस्थ करने योग्य पावन संग्रह।",
    pdfLink: "/granth/Jinwani%20Kanthhar%202024.pdf",
    pdfFilePath: "/granth/Jinwani%20Kanthhar%202024.pdf"
  },
  {
    id: "granth-20",
    titleHindi: "कथा कुसुमाञ्जलि",
    titleEnglish: "Katha Kusumanjali",
    versesCount: "152 पृष्ठ",
    language: "हिंदी",
    description: "जैन धर्म के सिद्धांतों, सदाचार एवं शील पर आधारित शिक्षाप्रद एवं मनोहारी आध्यात्मिक कथाओं का अनुपम गुलदस्ता।",
    pdfLink: "/granth/KATHA%20KUSUMANALI.pdf",
    pdfFilePath: "/granth/KATHA%20KUSUMANALI.pdf"
  },
  {
    id: "granth-21",
    titleHindi: "खाने वालों! सोचो",
    titleEnglish: "Khane Walon! Socho",
    versesCount: "56 पृष्ठ",
    language: "हिंदी",
    description: "भक्ष्य-अभक्ष्य विवेक, शुद्ध शाकाहार, स्वास्थ्य एवं अहिंसक आहार पद्धति पर वैज्ञानिक व आध्यात्मिक विमर्श।",
    pdfLink: "/granth/KWS_2026.pdf",
    pdfFilePath: "/granth/KWS_2026.pdf"
  },
  {
    id: "granth-22",
    titleHindi: "कड़वे सच (11वाँ संस्करण)",
    titleEnglish: "Kadve Sach (11th Edition)",
    versesCount: "96 पृष्ठ",
    language: "हिंदी",
    description: "समाज, संस्कार, रूढ़ियों एवं धर्म के पाखंड पर मुनि श्री के निर्भीक, तीक्ष्ण और आँखें खोलने वाले क्रांतिकारी विचार।",
    pdfLink: "/granth/Kadve%20Sach%2011%20th%20EDN.pdf",
    pdfFilePath: "/granth/Kadve%20Sach%2011%20th%20EDN.pdf"
  },
  {
    id: "granth-23",
    titleHindi: "लघु स्वयम्भू स्तोत्र",
    titleEnglish: "Laghu Svayambhu Stotra",
    versesCount: "64 पृष्ठ",
    language: "संस्कृत / हिंदी",
    description: "24 तीर्थंकर भगवंतों की पावन स्तुति में रचित लघु स्वयम्भू स्तोत्र का पद्यानुवाद, अर्थ व भावार्थ।",
    pdfLink: "/granth/LAGHU%20SVAYMBHU%20STOTRA%20First%20Edn.pdf",
    pdfFilePath: "/granth/LAGHU%20SVAYMBHU%20STOTRA%20First%20Edn.pdf"
  },
  {
    id: "granth-24",
    titleHindi: "महावीर चरित्र",
    titleEnglish: "Mahavir Charitra 2024",
    versesCount: "300 पृष्ठ",
    language: "हिंदी",
    description: "चरम तीर्थंकर भगवान 1008 महावीर स्वामी का समग्र जीवन दर्शन, तपश्चर्या, दिव्य देशना एवं निर्वाण महोत्सव।",
    pdfLink: "/granth/Mahavir%20Charitra%202024%20Single%20Page.pdf",
    pdfFilePath: "/granth/Mahavir%20Charitra%202024%20Single%20Page.pdf"
  },
  {
    id: "granth-25",
    titleHindi: "मल्लिनाथ पुराण",
    titleEnglish: "Mallinath Puran",
    versesCount: "12 पृष्ठ",
    language: "हिंदी",
    description: "19वें तीर्थंकर भगवान मल्लिनाथ स्वामी के पावन जीवन एवं केवलज्ञान की संक्षिप्त स्तुति एवं महिमा।",
    pdfLink: "/granth/Mallinath%20Puran.pdf",
    pdfFilePath: "/granth/Mallinath%20Puran.pdf"
  },
  {
    id: "granth-26",
    titleHindi: "मेरू-मंदर पुराण (मराठी अनुवाद)",
    titleEnglish: "Meroo-Mandar Puran (Marathi)",
    versesCount: "168 पृष्ठ",
    language: "मराठी",
    description: "मेरू-मंदर अकृत्रिम चैत्यालय व जिनधर्म आख्यानाचा मुनि श्री सुवन्द्य सागर जी महाराज कृत मराठी अनुवाद।",
    pdfLink: "/granth/Meroo-Mandar%20Puran.pdf",
    pdfFilePath: "/granth/Meroo-Mandar%20Puran.pdf"
  },
  {
    id: "granth-27",
    titleHindi: "मूलाचार प्रदीप (भाग-1)",
    titleEnglish: "Mulachar Pradeep",
    versesCount: "640 पृष्ठ",
    language: "संस्कृत / हिंदी",
    description: "भट्टारक श्री सकलकीर्ति विरचित मूलाचार प्रदीप पर मुनि श्री सुवन्द्य सागर जी कृत सद्‌वृत्तदीपिका टीका।",
    pdfLink: "/granth/Mulachar_6.pdf",
    pdfFilePath: "/granth/Mulachar_6.pdf"
  },
  {
    id: "granth-28",
    titleHindi: "पवनपुत्र हनुमान",
    titleEnglish: "Pawanputra Hanuman",
    versesCount: "126 पृष्ठ",
    language: "हिंदी",
    description: "जैन रामायण परंपरा के अनुसार कामदेव पदधारी ब्रह्मचारी, परम जिनभक्त महामुनि हनुमान जी का सत्य चरित्र।",
    pdfLink: "/granth/PPH%202023.pdf",
    pdfFilePath: "/granth/PPH%202023.pdf"
  },
  {
    id: "granth-29",
    titleHindi: "फूल खिले हैं गुलशन-गुलशन",
    titleEnglish: "Phool Khile Hain Gulshan Gulshan",
    versesCount: "124 पृष्ठ",
    language: "हिंदी",
    description: "जीवन में शांति, आनंद और सद्भावना की सुगंध फैलाने वाले प्रेरक प्रसंगों एवं संस्मरणों का सुंदर संकलन।",
    pdfLink: "/granth/Phool%20khile%20hai%20gulshan%20gulshan%202nd%20edn%202020.pdf",
    pdfFilePath: "/granth/Phool%20khile%20hai%20gulshan%20gulshan%202nd%20edn%202020.pdf"
  },
  {
    id: "granth-30",
    titleHindi: "पूजा प्रणाली",
    titleEnglish: "Puja Pranali",
    versesCount: "108 पृष्ठ",
    language: "हिंदी",
    description: "जिनेंद्र देव की षोडशोपचार पूजा, नित्य नियम पूजा एवं अभिषेक का शास्त्रीय व प्रामाणिक विधान।",
    pdfLink: "/granth/Puja%20Pranali.pdf",
    pdfFilePath: "/granth/Puja%20Pranali.pdf"
  },
  {
    id: "granth-31",
    titleHindi: "पुण्यवर्धिनी पूज्यांजलि (मराठी)",
    titleEnglish: "Punyavardhini Pujanjali (Marathi)",
    versesCount: "216 पृष्ठ",
    language: "मराठी",
    description: "पूज्य मुनि श्री सुवन्द्य सागर जी महाराज संपादित विविध पावन पूजा, स्तुती आणि भक्तीसंग्रह।",
    pdfLink: "/granth/Pujanjali%2007%20April%202024.pdf",
    pdfFilePath: "/granth/Pujanjali%2007%20April%202024.pdf"
  },
  {
    id: "granth-32",
    titleHindi: "पुरुषार्थसिद्धयुपाय",
    titleEnglish: "Purusharth Siddhupay",
    versesCount: "312 पृष्ठ",
    language: "संस्कृत / हिंदी",
    description: "आचार्य अमृतचंद्र कृत पुरुषार्थसिद्धयुपाय ग्रंथ पर मुनि श्री सुवन्द्य सागर जी की गहन व प्रामाणिक व्याख्या।",
    pdfLink: "/granth/Purusharth%20Siddhupay.pdf",
    pdfFilePath: "/granth/Purusharth%20Siddhupay.pdf"
  },
  {
    id: "granth-33",
    titleHindi: "रत्नत्रय व्रत कथा",
    titleEnglish: "Ratnatray Vrat Katha",
    versesCount: "24 पृष्ठ",
    language: "हिंदी",
    description: "सम्यग्दर्शन, सम्यग्ज्ञान, सम्यक्चारित्र रूप पावन रत्नत्रय महापर्व की शास्त्रीय विधि एवं प्रेरणादायी कथा।",
    pdfLink: "/granth/Ratnatray%20Vrat%20Katha%202020.pdf",
    pdfFilePath: "/granth/Ratnatray%20Vrat%20Katha%202020.pdf"
  },
  {
    id: "granth-34",
    titleHindi: "शांतिसागर महाराज की सच्ची परंपरा",
    titleEnglish: "Shantisagar Maharaj Ki Sacchi Parampara",
    versesCount: "125 पृष्ठ",
    language: "हिंदी",
    description: "चारित्र चक्रवर्ती आचार्य श्री 108 शांतिसागर जी महाराज की पावन दिगंबर श्रमण परंपरा का ऐतिहासिक दिग्दर्शन।",
    pdfLink: "/granth/SHANTISAGAR%20PARAMPARA.pdf",
    pdfFilePath: "/granth/SHANTISAGAR%20PARAMPARA.pdf"
  },
  {
    id: "granth-35",
    titleHindi: "सुदर्शनोदय",
    titleEnglish: "Sudarshanoday",
    versesCount: "100 पृष्ठ",
    language: "हिंदी",
    description: "महाकवि आचार्य श्री ज्ञानसागर जी महाराज कृत मूल रचना का मुनि श्री सुवन्द्य सागर जी कृत पद्यानुवाद।",
    pdfLink: "/granth/Sudarshanoday%202024%20Hindi.pdf",
    pdfFilePath: "/granth/Sudarshanoday%202024%20Hindi.pdf"
  },
  {
    id: "granth-36",
    titleHindi: "सुगन्ध दशमी व्रत कथा",
    titleEnglish: "Sugandh Dashmee",
    versesCount: "28 पृष्ठ",
    language: "हिंदी",
    description: "भाद्रपद शुक्ल दशमी को मनाए जाने वाले पावन सुगंध दशमी पर्व का शास्त्रीय माहात्म्य एवं व्रत कथा।",
    pdfLink: "/granth/Sugandh%20Dashmee.pdf",
    pdfFilePath: "/granth/Sugandh%20Dashmee.pdf"
  },
  {
    id: "granth-37",
    titleHindi: "तस्मै श्री गुरवे नमः",
    titleEnglish: "Tasmai Shri Gurave Namah",
    versesCount: "12 पृष्ठ",
    language: "हिंदी",
    description: "प्रथम तीर्थंकर भगवान आदिनाथ एवं गुरुदेव के चरणों में समर्पित पावन प्रवचन एवं कृतज्ञता वंदना।",
    pdfLink: "/granth/TSGN_Final.pdf",
    pdfFilePath: "/granth/TSGN_Final.pdf"
  },
  {
    id: "granth-38",
    titleHindi: "वृषभोद्धार कथा (मराठी)",
    titleEnglish: "Vrushabhoddhar Katha (Marathi)",
    versesCount: "35 पृष्ठ",
    language: "मराठी",
    description: "वृषभ (बैल) उद्धार आणि जैन धर्मातील प्राणिदया व करुणेची पावन मराठी कथा।",
    pdfLink: "/granth/Vrushaboddhar%20Katha.pdf",
    pdfFilePath: "/granth/Vrushaboddhar%20Katha.pdf"
  },
  {
    id: "granth-39",
    titleHindi: "मल्लिनाथ चरित्र (मराठी अनुवाद)",
    titleEnglish: "Mallinath Charitra (Marathi)",
    versesCount: "63 पृष्ठ",
    language: "मराठी",
    description: "भट्टारक सकलकीर्ति विरचित मल्लिनाथ चरित्र ग्रंथाचा मुनि श्री सुवन्द्य सागर जी कृत मराठी अनुवाद।",
    pdfLink: "/granth/mallinath%20charitra%20A.pdf",
    pdfFilePath: "/granth/mallinath%20charitra%20A.pdf"
  }
];

