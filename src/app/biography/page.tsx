import { Metadata } from 'next';
import React from 'react';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import { Feather, Award, BookOpen, CheckCircle, GraduationCap, MapPin, Calendar, HeartHandshake } from 'lucide-react';
import Link from 'next/link';

export const metadata: Metadata = {
  title: "जीवन परिचय (Biography) | मुनि श्री 108 सुवन्द्य सागर जी महाराज",
  description: "परम पूज्य निर्ग्रन्थ मुनि श्री 108 सुवन्द्य सागर जी महाराज का जीवन परिचय, बाल्यकाल, मुनि दीक्षा, आगमानुसारी चर्या, 24+ रचित ग्रन्थ एवं चातुर्मास विवरण।",
};

export default function BiographyPage() {
  return (
    <div className="min-h-screen flex flex-col bg-[#FAF8F5]">
      <Navbar />

      <main className="flex-1 py-16">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 space-y-12">
          
          {/* Header Banner */}
          <div className="text-center space-y-4">
            <div className="w-40 h-40 mx-auto rounded-full overflow-hidden border-4 border-amber-300 shadow-lg bg-amber-50">
              <img 
                src="/suvandya-sagar-ji.webp" 
                alt="पूज्य निर्ग्रन्थ मुनि श्री 108 सुवन्द्य सागर जी महाराज" 
                className="w-full h-full object-cover object-top"
              />
            </div>

            <div className="inline-flex items-center gap-1.5 px-4 py-1.5 rounded-full bg-amber-100/80 border border-amber-300/60 text-amber-900 text-xs font-semibold">
              <Feather className="w-3.5 h-3.5 text-amber-600" />
              <span>जीवन वृत्तांत एवं आगमानुसारी चर्या</span>
            </div>

            <h1 className="text-4xl sm:text-5xl font-serif font-bold text-[#1C1E26]">
              पूज्य निर्ग्रन्थ मुनि श्री 108 सुवन्द्य सागर जी महाराज
            </h1>
            <p className="text-sm text-gray-600 font-sans max-w-2xl mx-auto">
              त्याग, तप एवं आगमानुसार चर्या का अनुपम आदर्श। समस्त परिग्रहों का पूर्ण त्याग कर मोक्षमार्ग पर अग्रसर दिगम्बर मुनि।
            </p>
          </div>

          {/* Life Journey Section */}
          <div className="space-y-8">
            
            {/* Card 1: Birth & Purvashram */}
            <div className="glass-card rounded-2xl p-6 sm:p-8 border border-amber-200/60 shadow-xs space-y-4">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-xl bg-amber-100 text-amber-800 flex items-center justify-center font-bold font-serif text-lg">
                  01
                </div>
                <h2 className="text-2xl font-serif font-bold text-[#1C1E26]">
                  जन्म एवं पूर्वाश्रम (Purvashram & Birth)
                </h2>
              </div>
              
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-xs font-sans bg-amber-50/50 p-4 rounded-xl border border-amber-200/40">
                <div><strong>पूर्वाश्रम नाम:</strong> बाल ब्रह्मचारी प्राणेश प्रदीप हेडकर जैन</div>
                <div><strong>जन्म दिनांक:</strong> 03 अप्रैल 1972</div>
                <div><strong>जन्म स्थान:</strong> जिंतूर, जिला परभणी, महाराष्ट्र</div>
                <div><strong>पिता:</strong> श्री प्रदीप हेडकर जी जैन</div>
                <div><strong>माता:</strong> श्रीमती कुसुमताई जैन</div>
                <div><strong>लौकिक शिक्षा:</strong> बी.एससी. (B.Sc.)</div>
              </div>

              <p className="text-sm text-gray-700 leading-relaxed font-sans pt-2">
                जिंतूर (महाराष्ट्र) की पवित्र भूमि में जन्मे प्राणेश जी ने बी.एससी. तक उच्च शिक्षा प्राप्त की। सांसारिक जीवन में रहते हुए भी आपका मन अध्यात्म और धर्म के प्रति समर्पित रहा, जिसने आपको संयम पथ की ओर प्रेरित किया।
              </p>
            </div>

            {/* Card 2: Vrat & Deeksha */}
            <div className="glass-card rounded-2xl p-6 sm:p-8 border border-amber-200/60 shadow-xs space-y-4 bg-gradient-to-r from-amber-50/50 via-white to-amber-50/50">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-xl bg-amber-600 text-white flex items-center justify-center font-bold font-serif text-lg">
                  02
                </div>
                <h2 className="text-2xl font-serif font-bold text-[#1C1E26]">
                  ब्रह्मचर्य व्रत एवं मुनि दीक्षा
                </h2>
              </div>
              
              <div className="space-y-3 text-sm text-gray-700 font-sans">
                <div className="flex items-start gap-3 p-3 bg-white/80 rounded-xl border border-amber-200/50">
                  <CheckCircle className="w-5 h-5 text-amber-600 flex-shrink-0 mt-0.5" />
                  <div>
                    <strong>ब्रह्मचर्य व्रत:</strong> नवागढ़, जिला बेमेतरा (छत्तीसगढ़) में <strong>मुनि श्री 108 समाधि सागर जी महाराज</strong> के सान्निध्य में ब्रह्मचर्य व्रत अंगीकार किया।
                  </div>
                </div>

                <div className="flex items-start gap-3 p-3 bg-white/80 rounded-xl border border-amber-200/50">
                  <CheckCircle className="w-5 h-5 text-amber-600 flex-shrink-0 mt-0.5" />
                  <div>
                    <strong>मुनि दीक्षा दिनांक व स्थान:</strong> <strong>05 फ़रवरी 2004</strong> को सिद्धक्षेत्र गजपंथ, नासिक (महाराष्ट्र) में <strong>आचार्य श्री 108 सुविधि सागर जी महाराज</strong> के पावन कर-कमलों से मुनि दीक्षा प्राप्त की।
                  </div>
                </div>
              </div>
            </div>

            {/* Card 3: Granth Creation (24+ Granthas) */}
            <div className="glass-card rounded-2xl p-6 sm:p-8 border border-amber-200/60 shadow-xs space-y-4">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-xl bg-amber-100 text-amber-800 flex items-center justify-center font-bold font-serif text-lg">
                  03
                </div>
                <h2 className="text-2xl font-serif font-bold text-[#1C1E26]">
                  ग्रंथ रचना व स्वाध्याय (24+ मौलिक ग्रंथ)
                </h2>
              </div>

              <p className="text-sm text-gray-700 leading-relaxed font-sans">
                मुनि श्री १०८ सुवन्द्य सागर जी महाराज ने अनेक जैन आगमों का गहन स्वाध्याय कर हिंदी एवं मराठी भाषाओं में 24 से अधिक ग्रंथों का लेखन एवं पद्यानुवाद किया है।
              </p>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 pt-2 text-xs">
                <div className="p-4 bg-amber-50/60 rounded-xl border border-amber-200/50 space-y-2">
                  <h4 className="font-bold text-amber-900 text-sm">हिंदी रचनाएँ:</h4>
                  <p className="text-gray-700 leading-relaxed">
                    कड़वे सच, उपासक संस्कार, तमसो मा ज्योतिर्गमय, दानोपदेश, धन्य मुनिचर्या!, बिखरे मोती, बनता है हंस शोभा, दानगाथा, जिनवाणी कण्ठहार, अमितगति श्रावकाचार, पुरुषार्थसिद्ध्युपाय, फुल खिले हैं गुलशन-गुलशन, स्याद्वाद आलोक, सुगन्धदशमीव्रतकथा, जिनाभिषेक एवं पूजन विचार, चन्द्रप्रभ चरित्र, दिगम्बरत्व का रहस्य, लघु स्वयम्भू स्तोत्र, भ्रमतमहर दिवाकर, सिद्धक्षेत्र चूलगिरि, आचारसार, सिद्धभक्ति की झलक, अनूठे प्रवचन, गुरु गरिमा।
                  </p>
                </div>

                <div className="p-4 bg-amber-50/60 rounded-xl border border-amber-200/50 space-y-2">
                  <h4 className="font-bold text-amber-900 text-sm">मराठी रचनाएँ:</h4>
                  <p className="text-gray-700 leading-relaxed">
                    हनुमान चरित्र, वृषभोद्धार कथा, इंद्र चरित्र, संत साधना, भद्रबाहू आख्यान, सम्यक्त्व कौमुदी, मल्लिनाथ चरित्र, मेरू-मंदर पुराण, जिनवाणी शतक।
                  </p>
                </div>
              </div>
            </div>

            {/* Card 4: Chaturmas List */}
            <div className="glass-card rounded-2xl p-6 sm:p-8 border border-amber-200/60 shadow-xs space-y-4">
              <h2 className="text-2xl font-serif font-bold text-[#1C1E26]">
                पावन चातुर्मास प्रवास (Chaturmas Locations)
              </h2>
              <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-3 text-xs">
                <div className="p-3 bg-amber-100/80 rounded-xl border border-amber-300 ring-2 ring-amber-400/30">
                  <span className="font-bold text-amber-900">2026 (वर्तमान चातुर्मास):</span> सलूम्बर (राजस्थान)
                </div>
                <div className="p-3 bg-white rounded-xl border border-amber-200">
                  <span className="font-bold text-amber-800">2025:</span> बोरगांव मंजी, अकोला (महाराष्ट्र)
                </div>
                <div className="p-3 bg-white rounded-xl border border-amber-200">
                  <span className="font-bold text-amber-800">2024:</span> नरवाली (राजस्थान)
                </div>
                <div className="p-3 bg-white rounded-xl border border-amber-200">
                  <span className="font-bold text-amber-800">2023:</span> नरवाली (राजस्थान)
                </div>
              </div>
            </div>

          </div>

          <div className="text-center pt-6">
            <Link 
              href="/" 
              className="px-6 py-3 rounded-xl bg-amber-600 hover:bg-amber-700 text-white text-sm font-medium transition-colors shadow-sm inline-flex items-center gap-2"
            >
              <span>मुख्य पृष्ठ पर वापस जाएं (Back to Home)</span>
            </Link>
          </div>

        </div>
      </main>

      <Footer />
    </div>
  );
}
