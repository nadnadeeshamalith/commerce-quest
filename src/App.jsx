import React, { useState, useEffect } from 'react';
import { 
  Trophy, Star, ArrowRight, RefreshCw, CheckCircle2, 
  XCircle, BookOpen, Loader2, Award, 
  ChevronRight, Brain, ArrowLeft, X, LayoutGrid, ListChecks, History, UserCircle,
  ThumbsUp, ThumbsDown
} from 'lucide-react';
import { initializeApp } from 'firebase/app';
import { 
  getFirestore, collection, addDoc, onSnapshot 
} from 'firebase/firestore';
import { 
  getAuth, signInAnonymously, onAuthStateChanged, signInWithCustomToken 
} from 'firebase/auth';

// --- පියවර 1: ඔබේ Firebase Keys මෙතනට ඇතුළත් කර ඇත ---
const myLocalFirebaseConfig = {
  apiKey: "AIzaSyCRHB0j1sfZ5WMlUHDcuj60GIZI_AELwaU",
  authDomain: "mylocalfirebaseconfig.firebaseapp.com",
  projectId: "mylocalfirebaseconfig",
  storageBucket: "mylocalfirebaseconfig.firebasestorage.app",
  messagingSenderId: "253657541631",
  appId: "1:253657541631:web:b9d6c925b5af97ebc195ca"
};

const firebaseConfig = typeof __firebase_config !== 'undefined' 
  ? JSON.parse(__firebase_config) 
  : myLocalFirebaseConfig;

const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const db = getFirestore(app);
const appId = typeof __app_id !== 'undefined' ? __app_id : 'commerce-quest-pro-40';

// ප්‍රශ්න බැංකුව (ප්‍රශ්න පත්‍ර 40 කට අදාළව)
const fullQuestionBank = [
  // --- PAPER 1 (ප්‍රශ්න 40) ---
  { paperId: 1, id: 1, subject: "BS", question: "ව්‍යාපාරයක මූලික ආර්ථික පරමාර්ථය කුමක්ද?", options: ["සමාජ සේවය කිරීම", "ලාභ උපරිම කිරීම", "රැකියා සම්පාදනය", "රජයට බදු ගෙවීම"], answer: 1, explanation: "ඕනෑම ලාභ අරමුණු කරගත් ව්‍යාපාරයක මූලික ආර්ථික පරමාර්ථය වන්නේ ලාභ උපරිම කිරීමයි." },
  { paperId: 1, id: 2, subject: "BS", question: "බාහිර ව්‍යාපාරික පරිසරයට අයත් නොවන්නේ කුමක්ද?", options: ["සැපයුම්කරුවන්", "තරඟකරුවන්", "සේවකයින්", "ආර්ථික තත්ත්වය"], answer: 2, explanation: "සේවකයින් යනු ව්‍යාපාරයේ අභ්‍යන්තර පරිසරයට අයත් පාර්ශවයකි." },
  { paperId: 1, id: 3, subject: "BS", question: "සීමිත වගකීමක් සහිත ව්‍යාපාර සංවිධාන වර්ගය කුමක්ද?", options: ["තනි පුද්ගල ව්‍යාපාර", "හවුල් ව්‍යාපාර", "සීමිත පොදු සමාගම්", "අවිධිමත් ව්‍යාපාර"], answer: 2, explanation: "සමාගමක කොටස්කරුවන්ගේ වගකීම ඔවුන් යෙදවූ ප්‍රාග්ධනයට පමණක් සීමා වේ." },
  { paperId: 1, id: 4, subject: "BS", question: "කළමනාකරණයේ මූලික කාර්යයන් නිවැරදිව පෙළගස්වා ඇති පිළිතුර තෝරන්න.", options: ["සැලසුම්කරණය, සංවිධානය, මෙහෙයවීම, පාලනය", "පාලනය, මෙහෙයවීම, සංවිධානය, සැලසුම්කරණය", "සැලසුම්කරණය, පාලනය, සංවිධානය, මෙහෙයවීම", "සංවිධානය, සැලසුම්කරණය, පාලනය, මෙහෙයවීම"], answer: 0, explanation: "කළමනාකරණ ක්‍රියාවලිය සෑම විටම ආරම්භ වන්නේ සැලසුම්කරණයෙන් වන අතර අවසන් වන්නේ පාලනයෙනි." },
  { paperId: 1, id: 5, subject: "BS", question: "ශ්‍රී ලංකා මහ බැංකුවේ ප්‍රධාන කාර්යයක් නොවන්නේ කුමක්ද?", options: ["මුදල් නිකුත් කිරීම", "වාණිජ බැංකු නියාමනය කිරීම", "මහජනතාවට ණය ලබා දීම", "රජයේ බැංකුවකරු ලෙස ක්‍රියා කිරීම"], answer: 2, explanation: "මහ බැංකුව සෘජුවම සාමාන්‍ය මහජනතාව සමග ගනුදෙනු නොකරයි." },
  { paperId: 1, id: 6, subject: "BS", question: "අලෙවිකරණ මිශ්‍රණයේ (Marketing Mix) '4P' වලට අයත් නොවන්නේ?", options: ["Product (නිෂ්පාදිතය)", "Price (මිල)", "People (මිනිසුන්)", "Promotion (ප්‍රවර්ධනය)"], answer: 2, explanation: "මූලික 4P වලට අයත් වන්නේ Product, Price, Place සහ Promotion වේ." },
  { paperId: 1, id: 7, subject: "BS", question: "ව්‍යවසායකයෙකුගේ මූලික ලක්ෂණයක් වන්නේ?", options: ["අවදානම් මඟ හැරීම", "නවෝත්පාදනය", "ප්‍රාග්ධනය නොමැතිකම", "අන් අයගේ උපදෙස් මත පමණක් ක්‍රියා කිරීම"], answer: 1, explanation: "අවදානම් දරමින් නව දෑ සොයා යාම (නවෝත්පාදනය) ව්‍යවසායකත්වයේ මූලික ලක්ෂණකි." },
  { paperId: 1, id: 8, subject: "BS", question: "රක්ෂණයේ 'උපරිම යහපත් විශ්වාසය' යන මූලධර්මයෙන් අදහස් වන්නේ කුමක්ද?", options: ["රක්ෂණකරුට පමණක් තොරතුරු හෙළි කිරීම", "සියලුම වැදගත් තොරතුරු දෙපාර්ශවයම හෙළි කිරීම", "රක්ෂිතයාට වන්දි නොගෙවීම", "වාරික අඩු කිරීම"], answer: 1, explanation: "රක්ෂණ ගිවිසුමකට එළඹීමේදී දෙපාර්ශවයම තමන් දන්නා සියලු සත්‍ය තොරතුරු හෙළි කළ යුතුය." },
  { paperId: 1, id: 9, subject: "BS", question: "ව්‍යාපාරයක 'දැක්ම' (Vision) යන්නෙන් අදහස් වන්නේ?", options: ["වර්තමාන තත්ත්වය", "අනාගතයේ ළඟා වීමට අපේක්ෂිත තත්ත්වය", "දෛනික කාර්යයන්", "ලාභය"], answer: 1, explanation: "දැක්ම යනු ව්‍යාපාරය අනාගතයේදී කෙසේ විය යුතුද යන්න පිළිබඳ සිහිනයයි." },
  { paperId: 1, id: 10, subject: "BS", question: "පාරිභෝගික ආරක්ෂණ අධිකාරියේ කාර්යයක් වන්නේ?", options: ["ව්‍යාපාර සඳහා ණය දීම", "පාරිභෝගික අයිතීන් සුරැකීම සහ අසාධාරණ වෙළඳාම් වැළැක්වීම", "භාණ්ඩ නිෂ්පාදනය කිරීම", "සේවක වැටුප් තීරණය කිරීම"], answer: 1, explanation: "වෙළඳපොලේ පාරිභෝගිකයා ආරක්ෂා කිරීම ඔවුන්ගේ ප්‍රධාන අරමුණයි." },
  { paperId: 1, id: 11, subject: "ACC", question: "මූලික ගිණුම්කරණ සමීකරණය නිවැරදිව දක්වා ඇත්තේ?", options: ["වත්කම් = වගකීම් - හිමිකම්", "හිමිකම් = වත්කම් + වගකීම්", "වත්කම් = හිමිකම් + වගකීම්", "වගකීම් = වත්කම් + හිමිකම්"], answer: 2, explanation: "වත්කම් (A) සමාන වන්නේ හිමිකම් (E) සහ වගකීම් (L) වල එකතුවටයි (A = E + L)." },
  { paperId: 1, id: 12, subject: "ACC", question: "ද්විත්ව සටහන් න්‍යායට අනුව වත්කමක් වැඩි වීමක් සටහන් කරන්නේ?", options: ["හර පැත්තේ", "බැර පැත්තේ", "ශේෂ පත්‍රයේ පමණි", "ලාභ අලාභ ගිණුමේ"], answer: 0, explanation: "වත්කම් සහ වියදම් වැඩි වීම සෑම විටම අදාළ ගිණුමේ හර (Debit) කරනු ලැබේ." },
  { paperId: 1, id: 13, subject: "ACC", question: "විකුණුම් ජර්නලයේ සටහන් කරනු ලබන්නේ?", options: ["සියලුම විකුණුම්", "මුදල් විකුණුම් පමණි", "ණයට කළ භාණ්ඩ විකුණුම් පමණි", "ස්ථාවර වත්කම් විකුණුම්"], answer: 2, explanation: "විකුණුම් ජර්නලයේ සටහන් කරන්නේ ව්‍යාපාරයේ වෙළඳ භාණ්ඩ ණයට විකිණීම පමණි." },
  { paperId: 1, id: 14, subject: "ACC", question: "ක්ෂය කිරීම (Depreciation) යනු?", options: ["වත්කමක වටිනාකම වෙළඳපොලේ අඩු වීම", "ස්ථාවර වත්කමක පිරිවැය එහි ඵලදායී ආයු කාලය පුරා ක්‍රමානුකූලව කපා හැරීම", "වත්කමක් විකිණීම", "අලුත්වැඩියා වියදම්"], answer: 1, explanation: "ක්ෂය කිරීම යනු භාවිතය, කාලය ගතවීම වැනි හේතු නිසා ස්ථාවර වත්කමක පිරිවැය කපා හැරීමේ ගිණුම්කරණ ක්‍රියාවලියයි." },
  { paperId: 1, id: 15, subject: "ACC", question: "පහත දැක්වෙන ඒවායින් ජංගම වගකීමක් (Current Liability) වන්නේ?", options: ["බැංකු ණය (අවු. 5)", "ණයගැතියන්", "ණයහිමියන්", "මෝටර් රථ"], answer: 2, explanation: "ණයහිමියන් යනු වසරක් ඇතුළත ගෙවා නිම කළ යුතු බැඳීමක් බැවින් එය ජංගම වගකීමකි." },
  { paperId: 1, id: 16, subject: "ACC", question: "බැංකු සැසඳුම් ප්‍රකාශයක් (Bank Reconciliation Statement) පිළියෙළ කරන්නේ ඇයි?", options: ["ලාභය සෙවීමට", "මුදල් පොතේ බැංකු තීරුවේ ශේෂය සහ බැංකු ප්‍රකාශයේ ශේෂය අතර වෙනස්කම් පැහැදිලි කිරීමට", "බදු ගෙවීමට", "සේවක වැටුප් ගණනය කිරීමට"], answer: 1, explanation: "සැසඳුම් ප්‍රකාශය මගින් මුදල් පොත හා බැංකු ප්‍රකාශය අතර පවතින වෙනස්කම් ගළපා පෙන්වයි." },
  { paperId: 1, id: 17, subject: "ACC", question: "අත්තිකාරම් ක්‍රමය (Imprest System) බහුලව භාවිතා වන්නේ කුමන පොතක් සඳහාද?", options: ["සුළු මුදල් පොත", "විකුණුම් ජර්නලය", "මිලදී ගැනුම් ජර්නලය", "පොදු ජර්නලය"], answer: 0, explanation: "සුළු වියදම් පාලනය කිරීම සඳහා සුළු මුදල් පොත පවත්වාගෙන යන්නේ අත්තිකාරම් ක්‍රමය යටතේය." },
  { paperId: 1, id: 18, subject: "ACC", question: "'ප්‍රාග්ධන වියදමක්' ලෙස සැලකිය හැක්කේ?", options: ["යන්ත්‍රයක් සඳහා යෙදූ ලිහිසි තෙල් මිල", "නව යන්ත්‍රයක් මිලදී ගැනීමේ පිරිවැය", "සේවක වැටුප්", "විදුලි බිල"], answer: 1, explanation: "ස්ථාවර වත්කම් අත්පත් කර ගැනීමට හෝ එහි ධාරිතාවය වැඩි කිරීමට දරන වියදම් ප්‍රාග්ධන වියදම් වේ." },
  { paperId: 1, id: 19, subject: "ACC", question: "හිඟකම් (Arrears) හෙවත් ගෙවිය යුතු වියදම් වර්ෂ අවසානයේදී සටහන් කරන්නේ?", options: ["වත්කමක් ලෙස", "වගකීමක් ලෙස", "ආදායමක් ලෙස", "ප්‍රාග්ධනයක් ලෙස"], answer: 1, explanation: "ගෙවිය යුතු නමුත් තවමත් ගෙවා නොමැති වියදම් ව්‍යාපාරයට ජංගම වගකීමකි." },
  { paperId: 1, id: 20, subject: "ACC", question: "අමුද්‍රව්‍ය, වැඩ කොටස් සහ නිමි භාණ්ඩ එකතුව හඳුන්වන්නේ කුමක් ලෙසද?", options: ["ස්ථාවර වත්කම්", "තොගය (Inventory)", "ප්‍රාග්ධනය", "විකුණුම්"], answer: 1, explanation: "නිෂ්පාදන ආයතනයක පවතින මෙම කොටස් තුනේම එකතුව ව්‍යාපාරයේ තොගය ලෙස හැඳින්වේ." },
  { paperId: 1, id: 21, subject: "ECON", question: "ආර්ථික විද්‍යාවේදී 'ආවස්ථික පිරිවැය' (Opportunity Cost) යනු?", options: ["නිෂ්පාදනය සඳහා යන මුළු මුදල", "විකල්පයක් තෝරා ගැනීමේදී අත්හැරීමට සිදුවන ඊළඟ හොඳම විකල්පයේ වටිනාකම", "බදු මුදල", "ලාභය අහිමි වීම"], answer: 1, explanation: "සීමිත සම්පත් නිසා එක් දෙයක් තෝරාගන්නා විට අහිමි වන අනෙක් හොඳම විකල්පය ආවස්ථික පිරිවැයයි." },
  { paperId: 1, id: 22, subject: "ECON", question: "සාර්ව ආර්ථික විද්‍යාවේ (Macroeconomics) අධ්‍යයන විෂයයක් වන්නේ?", options: ["තනි පාරිභෝගිකයෙකුගේ හැසිරීම", "එක් ආයතනයක මිල තීරණය කිරීම", "රටේ සමස්ත උද්ධමනය සහ සේවා වියුක්තිය", "නිශ්චිත භාණ්ඩයක ඉල්ලුම"], answer: 2, explanation: "සාර්ව ආර්ථික විද්‍යාව මගින් ආර්ථිකයක් සමස්තයක් ලෙස (උද්ධමනය, ජාතික ආදායම) අධ්‍යයනය කරයි." },
  { paperId: 1, id: 23, subject: "ECON", question: "ඉල්ලුම් නීතියට (Law of Demand) අනුව, භාණ්ඩයක මිල ඉහළ යන විට?", options: ["ඉල්ලුම් ප්‍රමාණය ඉහළ යයි", "ඉල්ලුම් ප්‍රමාණය පහළ යයි", "සැපයුම පහළ යයි", "මිල තවදුරටත් ඉහළ යයි"], answer: 1, explanation: "අනෙකුත් සාධක ස්ථාවරව තිබියදී භාණ්ඩයක මිල හා ඉල්ලුම් ප්‍රමාණය අතර ඇත්තේ ප්‍රතිලෝම සම්බන්ධයකි." },
  { paperId: 1, id: 24, subject: "ECON", question: "සැපයුම් නම්‍යතාවය (Elasticity of Supply) මගින් මනිනු ලබන්නේ කුමක්ද?", options: ["මිල වෙනස් වීමේදී ඉල්ලුම වෙනස් වන අනුපාතය", "මිල වෙනස් වීමේදී සැපයුම් ප්‍රමාණය වෙනස් වන සංවේදීතාවය", "පාරිභෝගික ආදායම වෙනස් වීම", "රජයේ බදු අනුපාතය"], answer: 1, explanation: "භාණ්ඩයක මිලෙහි ප්‍රතිශත වෙනසකට ප්‍රතිචාර ලෙස එහි සැපයුම් ප්‍රමාණයේ සිදුවන ප්‍රතිශත වෙනස මෙයින් මනිනු ලැබේ." },
  { paperId: 1, id: 25, subject: "ECON", question: "පරිපූර්ණ තරඟකාරී වෙළඳපොලක (Perfect Competition) ලක්ෂණයක් නොවන්නේ?", options: ["විශාල ගැනුම්කරුවන් හා විකුණුම්කරුවන් සිටීම", "සමජාතීය භාණ්ඩ නිපදවීම", "තනි ආයතනයකට මිල තීරණය කළ හැකි වීම", "වෙළඳපොලට ඇතුළු වීමට හා පිටවීමට නිදහස තිබීම"], answer: 2, explanation: "පරිපූර්ණ තරඟයේදී තනි විකුණුම්කරුවෙකුට භාණ්ඩයේ මිල තීරණය කළ නොහැක; ඔවුන් 'මිල බාරගන්නන්' වේ." },
  { paperId: 1, id: 26, subject: "ECON", question: "මූලික ආර්ථික ප්‍රශ්න තුනට අයත් නොවන්නේ?", options: ["කුමක් කොපමණ නිපදවනවාද?", "කෙසේ නිපදවනවාද?", "කා සඳහා නිපදවනවාද?", "කොපමණ ලාභයක් ලබනවාද?"], answer: 3, explanation: "සෑම ආර්ථික පද්ධතියක්ම විසඳිය යුතු මූලික ප්‍රශ්න වන්නේ කුමක්, කෙසේ සහ කා සඳහා නිපදවනවාද යන්නයි." },
  { paperId: 1, id: 27, subject: "ECON", question: "උද්ධමනය (Inflation) යනු?", options: ["භාණ්ඩවල මිල ගණන් අඛණ්ඩව ඉහළ යාම", "මුදලේ අගය ඉහළ යාම", "විරැකියාව අඩු වීම", "රජයේ වියදම් අඩු වීම"], answer: 0, explanation: "පොදු මිල මට්ටම අඛණ්ඩව සහ සැලකිය යුතු ලෙස ඉහළ යාම උද්ධමනය ලෙස හැඳින්වේ." },
  { paperId: 1, id: 28, subject: "ECON", question: "නිදහස් වෙළඳපොල ආර්ථිකයක සම්පත් බෙදා හැරීම තීරණය කරන්නේ?", options: ["රජය විසින් පමණි", "මහ බැංකුව විසින්", "මිල යන්ත්‍රණය (Price Mechanism) මගින්", "කම්කරු සමිති මගින්"], answer: 2, explanation: "ධනවාදී හෝ නිදහස් ආර්ථිකයක ඉල්ලුම හා සැපයුම මත පදනම් වූ මිල යන්ත්‍රණය මගින් සම්පත් බෙදා හැරේ." },
  { paperId: 1, id: 29, subject: "ECON", question: "ප්‍රාග්ධන භාණ්ඩ (Capital Goods) යනු මොනවාද?", options: ["පාරිභෝගිකයා සෘජුව පරිභෝජනය කරන භාණ්ඩ", "වෙනත් භාණ්ඩ නිෂ්පාදනය කිරීම සඳහා යොදාගන්නා යන්ත්‍ර සූත්‍ර ආදිය", "ස්වභාවික සම්පත් පමණි", "සේවා පමණි"], answer: 1, explanation: "ප්‍රාග්ධන භාණ්ඩ යනු පාරිභෝගික භාණ්ඩ නිපදවීමට යොදා ගන්නා මිනිසා විසින් නිපදවූ වත්කම්ය." },
  { paperId: 1, id: 30, subject: "ECON", question: "සාමාන්‍ය භාණ්ඩයක් සඳහා පාරිභෝගිකයාගේ ආදායම ඉහළ යන විට ඉල්ලුම් වක්‍රයට කුමක් සිදුවේද?", options: ["වමට විතැන් වේ", "දකුණට විතැන් වේ", "වෙනස් නොවේ", "සිරස් අතට ගමන් කරයි"], answer: 1, explanation: "ආදායම වැඩි වන විට සාමාන්‍ය භාණ්ඩ සඳහා ඉල්ලුම වැඩි වන බැවින් ඉල්ලුම් වක්‍රය දකුණට විතැන් වේ." },
  { paperId: 1, id: 31, subject: "BS", question: "විවෘත ආර්ථිකයක ප්‍රධාන ලක්ෂණයක් වන්නේ?", options: ["ආනයන අපනයන සම්පූර්ණයෙන් තහනම් කිරීම", "ජාත්‍යන්තර වෙළඳාම සඳහා විවෘත වීම", "රජය විසින් පමණක් ව්‍යාපාර කිරීම", "විදේශ ආයෝජන ප්‍රතික්ෂේප කිරීම"], answer: 1, explanation: "විවෘත ආර්ථිකයක් වෙනත් රටවල් සමග වෙළඳ හා මූල්‍ය ගනුදෙනු නිදහසේ සිදු කරයි." },
  { paperId: 1, id: 32, subject: "ACC", question: "අස්පෘශ්‍ය වත්කමකට (Intangible Asset) උදාහරණයක් තෝරන්න.", options: ["යන්ත්‍ර සූත්‍ර", "මෝටර් රථ", "කීර්තිනාමය (Goodwill)", "වෙළඳ තොගය"], answer: 2, explanation: "භෞතික පැවැත්මක් නොමැති වුවත් ආර්ථික වටිනාකමක් ඇති වත්කම් අස්පෘශ්‍ය වත්කම් වේ." },
  { paperId: 1, id: 33, subject: "ECON", question: "සෘජු බද්දකට උදාහරණයක් වන්නේ?", options: ["එකතු කළ අගය මත බද්ද (VAT)", "රේගු බදු", "ආදායම් බද්ද", "නිෂ්පාදන බදු"], answer: 2, explanation: "බදු බර වෙනත් අයෙකුට මාරු කළ නොහැකි, බද්ද පනවන පුද්ගලයාම ගෙවන බදු සෘජු බදු වේ (උදා: ආදායම් බද්ද)." },
  { paperId: 1, id: 34, subject: "BS", question: "බහුජාතික සමාගමක් (MNC) යනු?", options: ["එක් රටක පමණක් ක්‍රියාත්මක වන සමාගමක්", "රටවල් කිහිපයක මෙහෙයුම් කටයුතු සිදු කරන සමාගමක්", "රජයට අයත් සමාගමක්", "ලාභ අරමුණු නොකරන සංවිධානයක්"], answer: 1, explanation: "මව් රටට අමතරව වෙනත් රටවල් වලද තම ශාඛා හෝ නිෂ්පාදන කටයුතු මෙහෙයවන සමාගම් බහුජාතික සමාගම් වේ." },
  { paperId: 1, id: 35, subject: "ACC", question: "හවුල් ව්‍යාපාරයක ලාභ අලාභ බෙදා ගන්නේ කෙසේද?", options: ["සමානව පමණි", "හවුල්කරුවන්ගේ වයස අනුව", "හවුල් ගිවිසුමේ සඳහන් අනුපාතයට", "රජයේ නීතිය අනුව පමණි"], answer: 2, explanation: "ලාභ අලාභ බෙදාගැනීම සඳහා හවුල් ගිවිසුමේ අනුපාතයක් සඳහන් කර ඇත්නම් ඒ අනුව සිදු කෙරේ." },
  { paperId: 1, id: 36, subject: "ECON", question: "ඒකාධිකාරී (Monopoly) වෙළඳපොලක ලක්ෂණයක් වන්නේ?", options: ["විකුණුම්කරුවන් විශාල සංඛ්‍යාවක් සිටීම", "එකම භාණ්ඩය නිෂ්පාදනය කරන තනි සැපයුම්කරුවෙකු සිටීම", "මිල තීරණය කිරීම පාරිභෝගිකයා සතු වීම", "පහසුවෙන් වෙළඳපොලට ඇතුළු විය හැකි වීම"], answer: 1, explanation: "ඒකාධිකාරයකදී සම්පූර්ණ වෙළඳපොල සැපයුම එක් ආයතනයක් විසින් පමණක් පාලනය කරයි." },
  { paperId: 1, id: 37, subject: "BS", question: "ප්‍රතිරූපය (Corporate Image) නංවා ගැනීමට සමාගමක් සිදුකරන කාර්යයන් අයත් වන්නේ?", options: ["මහජන සම්බන්ධතාවය (Public Relations)", "සෘජු අලෙවිකරණය", "පෞද්ගලික විකිණුම්", "මිල අඩු කිරීම"], answer: 0, explanation: "ව්‍යාපාරය සහ එහි මහජනතාව අතර යහපත් සබඳතාවක් ගොඩනැගීම PR හෙවත් මහජන සම්බන්ධතාවයයි." },
  { paperId: 1, id: 38, subject: "ACC", question: "වැරදි නිවැරදි කිරීමේදී සස්පෙන්ස් ගිණුමක් (Suspense Account) භාවිතා කරන්නේ කවර අවස්ථාවකද?", options: ["ලාභය අඩු වූ විට", "පරීක්ෂණ ශේෂය (Trial Balance) එකඟ නොවන විට", "බැංකු ශේෂය අඩුවූ විට", "නව වත්කමක් ගත් විට"], answer: 1, explanation: "පරීක්ෂණ ශේෂයේ හර සහ බැර එකතුව සමාන නොවන විට ඒ වෙනස තාවකාලිකව තබන්නේ සස්පෙන්ස් ගිණුමේය." },
  { paperId: 1, id: 39, subject: "ECON", question: "ගෙවුම් ශේෂය (Balance of Payments) මගින් පෙන්වන්නේ?", options: ["රජයේ ආදායම් හා වියදම්", "රටක් හා සෙසු ලෝකය අතර සියලුම ආර්ථික ගනුදෙනු වල සාරාංශය", "පුද්ගලික අංශයේ ලාභය", "බැංකු පද්ධතියේ ණය"], answer: 1, explanation: "නිශ්චිත කාලයක් තුළ රටක පදිංචිකරුවන් හා සෙසු ලෝකය අතර සිදුවන මූල්‍ය ගනුදෙනු මෙයින් දැක්වේ." },
  { paperId: 1, id: 40, subject: "BS", question: "ව්‍යාපාරික ආචාරධර්ම (Business Ethics) යනු?", options: ["ලාභය වැඩි කරගැනීමේ උපක්‍රම", "ව්‍යාපාරික ලෝකයේදී හරි සහ වැරදි දේ පිළිබඳ පිළිගත් සදාචාරාත්මක ප්‍රතිපත්ති", "රජයේ නීති මගහැරීම", "තරඟකරුවන් විනාශ කිරීම"], answer: 1, explanation: "නීතියට අමතරව ව්‍යාපාරයක් විසින් සමාජය කෙරෙහි ඉටුකළ යුතු සදාචාරාත්මක වගකීම් සහ ප්‍රතිපත්ති මෙයින් අදහස් වේ." },

  // --- PAPER 2 (උදාහරණ ප්‍රශ්න) ---
  { paperId: 2, id: 41, subject: "BS", question: "ව්‍යාපාරික පරිසරයේ 'දේශපාලන සාධකයක්' වන්නේ?", options: ["රජයේ බදු ප්‍රතිපත්තිය", "නව තාක්ෂණය", "සංස්කෘතිය", "පාරිභෝගික රුචිකත්වය"], answer: 0, explanation: "රජයේ තීරණ සහ බදු ප්‍රතිපත්ති දේශපාලනික සාධක ගණයට වැටේ." },
  { paperId: 2, id: 42, subject: "ACC", question: "වත්කමක් ණයට මිලදී ගැනීමේදී මූලික ලේඛනය (Source Document) කුමක්ද?", options: ["මුදල් වවුචරය", "ඉන්වොයිසිය (Invoice)", "රිසිට්පත", "බැංකු ප්‍රකාශය"], answer: 1, explanation: "ඕනෑම ණය ගනුදෙනුවකට අදාළ මූලික ලේඛනය ඉන්වොයිසියයි." },
  
  // --- සෙසු ප්‍රශ්න පත්‍ර (Paper 3-40 සඳහා මෙලෙස ප්‍රශ්න එකතු කරන්න) ---
  { paperId: 3, id: 43, subject: "ECON", question: "සම්පත් වල හිඟකම නිසා ඇතිවන මූලික ගැටලුව කුමක්ද?", options: ["තේරීම", "ලාභය", "බදු", "ණය"], answer: 0, explanation: "සම්පත් සීමිත බැවින් මිනිසාට තේරීම් කිරීමට සිදු වේ." }
];

export default function App() {
  const [user, setUser] = useState(null);
  const [gameState, setGameState] = useState('start'); 
  const [selectedPaper, setSelectedPaper] = useState(null);
  const [currentQuestions, setCurrentQuestions] = useState([]);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [score, setScore] = useState(0);
  const [showFeedback, setShowFeedback] = useState(false);
  const [isCorrect, setIsCorrect] = useState(false);
  const [selectedOption, setSelectedOption] = useState(null);
  const [leaderboard, setLeaderboard] = useState([]);
  const [userHistory, setUserHistory] = useState([]);
  const [userName, setUserName] = useState('');
  const [isLoading, setIsLoading] = useState(true);
  const [userVote, setUserVote] = useState(null);
  const [configError, setConfigError] = useState(false);
  const [userAnswers, setUserAnswers] = useState([]);
  const [showReview, setShowReview] = useState(false);

  // Firebase Auth පද්ධතිය
  useEffect(() => {
    if (!firebaseConfig.apiKey || firebaseConfig.apiKey === "YOUR_API_KEY") {
      setConfigError(true);
      setIsLoading(false);
      return;
    }

    const initAuth = async () => {
      try {
        if (typeof __initial_auth_token !== 'undefined' && __initial_auth_token) {
          await signInWithCustomToken(auth, __initial_auth_token);
        } else {
          await signInAnonymously(auth);
        }
      } catch (err) { 
        console.error("Authentication Error:", err);
      } finally { 
        setIsLoading(false); 
      }
    };
    
    initAuth();
    const unsubscribe = onAuthStateChanged(auth, (u) => {
      setUser(u);
    });
    return () => unsubscribe();
  }, []);

  // පොදු ලකුණු පුවරුව (Leaderboard)
  useEffect(() => {
    if (!user || !db) return;
    
    const q = collection(db, 'artifacts', appId, 'public', 'data', 'leaderboard');
    const unsubscribe = onSnapshot(q, (snapshot) => {
      const docs = snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
      setLeaderboard(docs.sort((a, b) => b.score - a.score).slice(0, 10));
    }, (error) => {
      console.error("Leaderboard Snapshot Error:", error);
    });
    
    return () => unsubscribe();
  }, [user]);

  // පරිශීලක ඉතිහාසය
  useEffect(() => {
    if (!user || !db) return;
    
    const q = collection(db, 'artifacts', appId, 'users', user.uid, 'scores');
    const unsubscribe = onSnapshot(q, (snapshot) => {
      const docs = snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
      setUserHistory(docs.sort((a, b) => b.timestamp - a.timestamp));
    }, (error) => {
      console.error("History Snapshot Error:", error);
    });
    
    return () => unsubscribe();
  }, [user]);

  const selectPaper = (paperId) => {
    const paperQuestions = fullQuestionBank.filter(q => q.paperId === paperId);
    if (paperQuestions.length === 0) {
      alert(`මෙම ප්‍රශ්න පත්‍රය (Paper ${paperId}) සඳහා තවමත් ප්‍රශ්න ඇතුළත් කර නැත. දැනට Paper 1, 2 හෝ 3 තෝරන්න.`);
      return;
    }
    setSelectedPaper(paperId);
    setCurrentQuestions(paperQuestions.sort(() => 0.5 - Math.random()).slice(0, 40));
    setCurrentIndex(0);
    setScore(0);
    setUserAnswers([]);
    setShowReview(false);
    setSelectedOption(null);
    setGameState('playing');
  };

  const selectOption = (idx) => {
    if (showFeedback) return;
    setSelectedOption(idx);
  };

  const checkAnswer = () => {
    if (selectedOption === null || showFeedback) return;
    const correct = selectedOption === currentQuestions[currentIndex].answer;
    setIsCorrect(correct);
    if (correct) setScore(prev => prev + 1);
    
    setUserAnswers(prev => [...prev, {
      questionIndex: currentIndex,
      selectedIdx: selectedOption,
      isSkipped: false
    }]);

    setShowFeedback(true);
  };

  const skipQuestion = () => {
    if (showFeedback) return;
    setSelectedOption(-1);
    setIsCorrect(false);
    
    setUserAnswers(prev => [...prev, {
      questionIndex: currentIndex,
      selectedIdx: -1,
      isSkipped: true
    }]);

    setShowFeedback(true);
  };

  const nextStep = () => {
    setShowFeedback(false);
    setSelectedOption(null);
    if (currentIndex + 1 < currentQuestions.length) {
      setCurrentIndex(currentIndex + 1);
    } else {
      setGameState('result');
    }
  };

  const saveScore = async () => {
    if (!userName.trim()) {
      alert("කරුණාකර ඔබේ නම ඇතුළත් කරන්න.");
      return;
    }
    if (!userVote) {
      alert("කරුණාකර ප්‍රශ්න පත්‍රය සඳහා ඔබේ Like හෝ Dislike ලබා දෙන්න.");
      return;
    }
    
    if (!user) {
      alert("දෝෂයක්: පරිශීලක ගිණුම සම්බන්ධ වී නැත.");
      return;
    }

    try {
      const scoreData = {
        name: userName,
        score: score,
        paperId: selectedPaper,
        timestamp: Date.now(),
        userId: user.uid,
        vote: userVote
      };
      
      await addDoc(collection(db, 'artifacts', appId, 'public', 'data', 'leaderboard'), scoreData);
      await addDoc(collection(db, 'artifacts', appId, 'users', user.uid, 'scores'), scoreData);
      
      setGameState('leaderboard');
    } catch (err) { 
      console.error("Save Score Error:", err);
      alert(`දත්ත සුරැකීමේදී ගැටලුවක් ඇති විය: ${err.message}`);
    }
  };

  if (configError) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-slate-950 p-6">
        <div className="bg-slate-900 border border-blue-500/30 p-8 rounded-[2rem] text-center max-w-md shadow-2xl">
          <Brain className="w-16 h-16 text-blue-500 mx-auto mb-6" />
          <h2 className="text-2xl font-black text-white mb-4 uppercase">Setup Required</h2>
          <p className="text-slate-400 leading-relaxed mb-6">ඔබේ Firebase Config දත්ත ඇතුළත් කරන්න.</p>
        </div>
      </div>
    );
  }

  if (isLoading) return <div className="min-h-screen flex items-center justify-center bg-slate-950"><Loader2 className="animate-spin text-blue-500 w-10 h-10" /></div>;

  return (
    <div className="min-h-screen bg-slate-950 text-slate-100 p-4 md:p-8 font-sans transition-all">
      <div className="max-w-3xl mx-auto">
        
        {/* Navigation Bar */}
        <div className="flex justify-between items-center mb-8 border-b border-slate-800 pb-4">
          <div className="flex items-center gap-3">
            <div className="bg-blue-600/20 p-2 rounded-xl border border-blue-500/30 text-blue-400">
              <Brain className="w-6 h-6" />
            </div>
            <h1 className="text-xl font-black uppercase tracking-widest hidden sm:block">Commerce Pro</h1>
          </div>
          <div className="flex gap-2">
            <button onClick={() => setGameState('history')} className="text-xs font-bold bg-slate-900 px-3 py-2 rounded-lg border border-slate-800 hover:border-blue-500 transition-all flex items-center gap-2">
              <History className="w-4 h-4 text-blue-400" /> මගේ දත්ත
            </button>
            <button onClick={() => setGameState('leaderboard')} className="text-xs font-bold bg-slate-900 px-3 py-2 rounded-lg border border-slate-800 hover:border-blue-500 transition-all flex items-center gap-2">
              <Trophy className="w-4 h-4 text-yellow-500" /> ලකුණු
            </button>
          </div>
        </div>

        {/* Start Screen */}
        {gameState === 'start' && (
          <div className="text-center py-12 animate-in zoom-in duration-500">
            <div className="inline-flex items-center gap-2 px-5 py-2.5 rounded-full bg-blue-500/10 border border-blue-500/30 text-blue-400 font-bold text-sm mb-8 animate-bounce shadow-[0_0_20px_rgba(59,130,246,0.2)]">
              <Star className="w-5 h-5 fill-yellow-500 text-yellow-500" /> Commerce වැඩ්ඩෙක් වෙන්න ඕනෙද?
            </div>
            
            <div className="relative w-32 h-32 mx-auto mb-8 group">
              <div className="absolute inset-0 bg-blue-500/20 blur-2xl rounded-full group-hover:bg-blue-500/40 transition-all duration-500"></div>
              <div className="relative bg-gradient-to-br from-slate-800 to-slate-900 w-full h-full rounded-[2.5rem] flex items-center justify-center border border-slate-700 shadow-2xl rotate-3 group-hover:rotate-0 transition-all duration-300">
                <Trophy className="w-16 h-16 text-yellow-500 drop-shadow-[0_0_15px_rgba(234,179,8,0.4)] group-hover:scale-110 transition-transform duration-300" />
              </div>
            </div>

            <h2 className="text-5xl md:text-6xl font-black mb-6 tracking-tighter text-transparent bg-clip-text bg-gradient-to-r from-blue-400 via-indigo-400 to-emerald-400 drop-shadow-lg uppercase">
              CHALLENGE MODE
            </h2>
            
            <p className="text-slate-400 mb-10 max-w-lg mx-auto leading-relaxed text-lg">
              ඔබේ දැනුම පරීක්ෂා කරගන්න හොඳම තැන! ප්‍රශ්න පත්‍ර 40 ක අභියෝගයට මුහුණ දී ලකුණු පුවරුවේ <span className="text-white font-black bg-emerald-500/20 px-2 py-1 rounded border border-emerald-500/30">#1</span> ස්ථානය දිනාගන්න.
            </p>
            
            <button 
              onClick={() => setGameState('select_paper')}
              className="group relative bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-500 hover:to-indigo-500 px-12 py-5 rounded-2xl font-black text-xl shadow-[0_0_40px_rgba(37,99,235,0.4)] flex items-center gap-3 mx-auto transition-all hover:scale-105 hover:shadow-[0_0_60px_rgba(37,99,235,0.6)] text-white overflow-hidden border border-blue-500/50"
            >
              <div className="absolute inset-0 bg-white/20 translate-y-full group-hover:translate-y-0 transition-transform duration-300 ease-out"></div>
              <span className="relative drop-shadow-md">අභියෝගය අරඹන්න</span> <ArrowRight className="relative group-hover:translate-x-2 transition-transform drop-shadow-md" />
            </button>
          </div>
        )}

        {/* Paper Selection Grid (40 Papers) */}
        {gameState === 'select_paper' && (
          <div className="animate-in fade-in duration-500">
            <div className="flex items-center gap-4 mb-8">
              <button onClick={() => setGameState('start')} className="p-2 hover:bg-slate-900 rounded-lg"><ArrowLeft /></button>
              <h2 className="text-2xl font-black uppercase">Select Paper</h2>
            </div>
            <div className="grid grid-cols-4 md:grid-cols-5 lg:grid-cols-8 gap-3">
              {Array.from({ length: 40 }, (_, i) => (
                <button
                  key={i}
                  onClick={() => selectPaper(i + 1)}
                  className="aspect-square bg-slate-900 border border-slate-800 rounded-xl flex flex-col items-center justify-center hover:bg-blue-600 hover:border-blue-400 transition-all group"
                >
                  <span className="text-xs text-slate-500 group-hover:text-blue-100 font-bold uppercase">Paper</span>
                  <span className="text-xl font-black">{i + 1}</span>
                </button>
              ))}
            </div>
          </div>
        )}

        {/* Playing UI */}
        {gameState === 'playing' && (
          <div className="space-y-6 animate-in slide-in-from-bottom-4">
             <div className="flex justify-between items-center bg-slate-900 p-4 rounded-2xl border border-slate-800 shadow-xl">
                <button onClick={() => setGameState('select_paper')} className="text-xs font-bold text-slate-500 flex items-center gap-1 hover:text-white uppercase"><X className="w-4 h-4" /> Stop</button>
                <div className="text-center">
                  <span className="block text-[10px] text-slate-500 font-bold uppercase tracking-widest">Paper {selectedPaper}</span>
                  <span className="text-sm font-black text-blue-400">{currentIndex + 1} / {currentQuestions.length}</span>
                </div>
                <div className="text-right">
                  <span className="block text-[10px] text-slate-500 font-bold uppercase tracking-widest text-emerald-500">Score</span>
                  <span className="text-sm font-black text-emerald-400">{score}</span>
                </div>
             </div>

             <div className="bg-slate-900 border border-slate-800 rounded-[2rem] overflow-hidden shadow-2xl">
                <div className="p-8 border-b border-slate-800 bg-slate-800/30">
                  <h3 className="text-xl md:text-2xl font-bold leading-relaxed">{currentQuestions[currentIndex].question}</h3>
                </div>
                <div className="p-8 space-y-3">
                  {currentQuestions[currentIndex].options.map((opt, i) => {
                    let bgClass = "bg-slate-950/50 border-slate-800 text-slate-300 hover:border-slate-600 hover:bg-slate-800";
                    let icon = null;

                    if (!showFeedback) {
                       if (selectedOption === i) {
                          bgClass = "bg-blue-500/20 border-blue-500 text-blue-200 shadow-[0_0_15px_rgba(59,130,246,0.2)]"; 
                       }
                    } else {
                       if (i === currentQuestions[currentIndex].answer) {
                          bgClass = "bg-emerald-500/20 border-emerald-500 text-emerald-200 font-bold"; 
                          icon = <CheckCircle2 className="w-5 h-5 text-emerald-500 inline mr-2 shrink-0" />;
                       } else if (selectedOption === i) {
                          bgClass = "bg-rose-500/20 border-rose-500 text-rose-200"; 
                          icon = <XCircle className="w-5 h-5 text-rose-500 inline mr-2 shrink-0" />;
                       } else {
                          bgClass = "bg-slate-950/30 border-slate-800/50 text-slate-500 opacity-50"; 
                       }
                    }

                    return (
                      <button
                        key={i}
                        onClick={() => selectOption(i)}
                        disabled={showFeedback}
                        className={`w-full text-left p-5 rounded-2xl border-2 transition-all flex items-center ${bgClass}`}
                      >
                        {icon} <span className="font-semibold">{opt}</span>
                      </button>
                    );
                  })}
                </div>
                
                <div className="p-8 border-t border-slate-800 bg-slate-950/30">
                  {showFeedback ? (
                    <div className="animate-in fade-in slide-in-from-bottom-2">
                      <div className={`p-4 rounded-xl mb-6 border ${isCorrect ? 'bg-emerald-500/10 border-emerald-500/30' : selectedOption === -1 ? 'bg-slate-800/50 border-slate-700' : 'bg-rose-500/10 border-rose-500/30'}`}>
                        <p className="text-slate-300 text-sm italic leading-relaxed">
                          <span className={`font-bold mr-2 ${isCorrect ? 'text-emerald-400' : selectedOption === -1 ? 'text-slate-400' : 'text-rose-400'}`}>
                            {isCorrect ? 'නිවැරදියි!' : selectedOption === -1 ? 'මඟ හරින ලදි.' : 'වැරදියි!'} විවරණය:
                          </span> 
                          {currentQuestions[currentIndex].explanation}
                        </p>
                      </div>
                      <button onClick={nextStep} className="w-full bg-blue-600 hover:bg-blue-500 text-white font-black py-4 rounded-xl flex items-center justify-center gap-2 uppercase tracking-widest transition-all shadow-lg shadow-blue-900/20">
                        ඊළඟ ප්‍රශ්නය (Next) <ArrowRight />
                      </button>
                    </div>
                  ) : (
                    <div className="flex gap-4">
                      <button onClick={skipQuestion} className="w-1/3 bg-slate-800 hover:bg-slate-700 text-slate-300 font-bold py-4 rounded-xl transition-all">
                        මඟ හරින්න (Skip)
                      </button>
                      <button 
                        onClick={checkAnswer} 
                        disabled={selectedOption === null}
                        className="w-2/3 bg-emerald-600 hover:bg-emerald-500 disabled:bg-slate-800 disabled:text-slate-500 text-white font-black py-4 rounded-xl transition-all uppercase tracking-widest flex items-center justify-center gap-2 shadow-lg"
                      >
                        පරීක්ෂා කරන්න (Check) <CheckCircle2 className="w-5 h-5" />
                      </button>
                    </div>
                  )}
                </div>
             </div>
          </div>
        )}

        {/* Result & Score Save */}
        {gameState === 'result' && (
          <div className="bg-slate-900 border border-slate-800 rounded-[3rem] p-10 text-center animate-in zoom-in shadow-2xl">
            <Award className="w-20 h-20 text-yellow-500 mx-auto mb-6 drop-shadow-[0_0_15px_rgba(234,179,8,0.3)]" />
            <h2 className="text-3xl font-black mb-2 uppercase">විශිෂ්ටයි!</h2>
            <p className="text-slate-400 mb-2">ඔබ ප්‍රශ්න පත්‍රය සාර්ථකව අවසන් කළා.</p>
            <div className="text-7xl font-black text-blue-500 my-8 drop-shadow-[0_0_20px_rgba(59,130,246,0.3)]">{score} <span className="text-xl text-slate-500">/ 40</span></div>
            
            <div className="mb-8 p-6 bg-slate-950/80 rounded-2xl border border-slate-800">
              <p className="text-slate-300 font-bold mb-4">ඔබ මෙම ප්‍රශ්න පත්‍රයට කැමතිද?</p>
              <div className="flex justify-center gap-6">
                <button 
                  onClick={() => setUserVote('like')}
                  className={`flex flex-col items-center gap-2 px-8 py-4 rounded-xl transition-all border-2 ${userVote === 'like' ? 'border-emerald-500 bg-emerald-500/20 text-emerald-400 scale-105' : 'border-slate-800 text-slate-500 hover:border-emerald-500/50 hover:text-emerald-400'}`}
                >
                  <ThumbsUp className={`w-8 h-8 ${userVote === 'like' ? 'fill-emerald-500' : ''}`} />
                  <span className="text-xs font-black uppercase tracking-widest">මනාපයි (Like)</span>
                </button>
                <button 
                  onClick={() => setUserVote('dislike')}
                  className={`flex flex-col items-center gap-2 px-8 py-4 rounded-xl transition-all border-2 ${userVote === 'dislike' ? 'border-rose-500 bg-rose-500/20 text-rose-400 scale-105' : 'border-slate-800 text-slate-500 hover:border-rose-500/50 hover:text-rose-400'}`}
                >
                  <ThumbsDown className={`w-8 h-8 ${userVote === 'dislike' ? 'fill-rose-500' : ''}`} />
                  <span className="text-xs font-black uppercase tracking-widest">අමනාපයි (Unlike)</span>
                </button>
              </div>
              {!userVote && <p className="text-rose-500/80 text-xs mt-3 animate-pulse">කරුණාකර ඉදිරියට යාමට පෙර ඔබේ ප්‍රතිචාරය දක්වන්න.</p>}
            </div>

            <div className="space-y-4 max-w-sm mx-auto">
              <div className="text-left">
                <label className="text-xs font-bold text-blue-400 uppercase tracking-widest ml-2">ඔබේ නම (YOUR NAME)</label>
                <input 
                  type="text" 
                  placeholder="නම මෙහි ලියන්න..." 
                  value={userName}
                  onChange={(e) => setUserName(e.target.value)}
                  className="w-full mt-2 p-5 bg-slate-950 border-2 border-slate-800 rounded-2xl focus:border-blue-500 outline-none text-center font-bold text-white text-lg transition-all"
                />
              </div>
              
              <button 
                onClick={saveScore} 
                disabled={!userName.trim() || !userVote} 
                className="w-full bg-emerald-600 hover:bg-emerald-500 py-5 rounded-2xl font-black shadow-lg disabled:opacity-30 disabled:cursor-not-allowed transition-all text-white mt-4"
              >
                ලකුණු සුරකින්න (Save Score)
              </button>
              <button onClick={() => setGameState('start')} className="w-full text-slate-500 hover:text-white font-bold py-2 flex items-center justify-center gap-2 transition-colors"><ArrowLeft className="w-4 h-4" /> මුල් පිටුවට</button>
            </div>

            {/* Answer Review Section */}
            <div className="mt-12 border-t border-slate-800 pt-8">
              <button 
                onClick={() => setShowReview(!showReview)}
                className="w-full bg-slate-800 hover:bg-slate-700 py-4 rounded-2xl font-black transition-all flex justify-center items-center gap-2 text-blue-400"
              >
                <ListChecks /> {showReview ? 'විවරණ පත්‍රිකාව වසන්න' : 'පිළිතුරු සහ විවරණ පත්‍රිකාව බලන්න'}
              </button>
              
              {showReview && (
                <div className="mt-8 space-y-6 text-left animate-in slide-in-from-top-4">
                  {currentQuestions.map((q, qIndex) => {
                    const userAnswer = userAnswers.find(ua => ua.questionIndex === qIndex);
                    const selectedIdx = userAnswer ? userAnswer.selectedIdx : -1;
                    
                    return (
                      <div key={q.id} className="bg-slate-950 p-6 rounded-2xl border border-slate-800">
                        <p className="font-bold text-lg mb-4 text-white"><span className="text-slate-500 mr-2">{qIndex + 1}.</span>{q.question}</p>
                        <div className="space-y-2">
                          {q.options.map((opt, optIdx) => {
                            let bgClass = "bg-slate-900 border-slate-800 text-slate-400";
                            let icon = null;
                            
                            if (optIdx === q.answer) {
                              bgClass = "bg-emerald-500/20 border-emerald-500 text-emerald-200";
                              icon = <CheckCircle2 className="w-5 h-5 text-emerald-500 inline mr-2 shrink-0" />;
                            } else if (optIdx === selectedIdx && selectedIdx !== -1) {
                              bgClass = "bg-rose-500/20 border-rose-500 text-rose-200";
                              icon = <XCircle className="w-5 h-5 text-rose-500 inline mr-2 shrink-0" />;
                            }

                            return (
                              <div key={optIdx} className={`p-3 rounded-xl border flex items-center ${bgClass}`}>
                                 {icon} <span>{opt}</span>
                              </div>
                            )
                          })}
                        </div>
                        <div className="mt-4 p-4 bg-blue-900/20 border border-blue-900/50 rounded-xl">
                          <p className="text-sm text-blue-200"><span className="font-bold text-blue-400">විවරණය:</span> {q.explanation}</p>
                        </div>
                      </div>
                    );
                  })}
                </div>
              )}
            </div>

          </div>
        )}

        {/* History Screen */}
        {gameState === 'history' && (
          <div className="bg-slate-900 border border-slate-800 rounded-[2rem] overflow-hidden animate-in fade-in">
             <div className="p-8 border-b border-slate-800 flex justify-between items-center bg-slate-800/20">
               <h2 className="text-2xl font-black uppercase tracking-tight flex items-center gap-3">
                 <History className="text-blue-400" /> මගේ ඉතිහාසය
               </h2>
               <button onClick={() => setGameState('start')} className="p-2 bg-slate-950 border border-slate-800 rounded-lg"><X /></button>
             </div>
             <div className="p-4 max-h-[400px] overflow-y-auto">
                {userHistory.length === 0 ? <p className="p-16 text-center text-slate-600 font-bold">තවමත් දත්ත නැත...</p> : 
                  userHistory.map((e, idx) => (
                    <div key={e.id} className="flex items-center justify-between p-5 hover:bg-slate-800/50 rounded-2xl mb-1 border-b border-slate-800/50 last:border-0">
                      <div className="flex items-center gap-5">
                        <span className="w-8 h-8 rounded-lg flex items-center justify-center font-black bg-slate-950 text-slate-500">{idx + 1}</span>
                        <div>
                          <p className="font-bold text-slate-200">Paper {e.paperId}</p>
                          <p className="text-[10px] text-slate-500 uppercase font-bold tracking-widest">{new Date(e.timestamp).toLocaleDateString()}</p>
                        </div>
                      </div>
                      <span className="text-2xl font-black text-blue-500">{e.score}</span>
                    </div>
                  ))
                }
             </div>
             <div className="p-8 border-t border-slate-800 bg-slate-950/30">
               <button onClick={() => setGameState('start')} className="w-full bg-slate-800 py-4 rounded-xl font-black hover:bg-slate-700 transition-all text-white">මුල් පිටුවට</button>
             </div>
          </div>
        )}

        {/* Leaderboard Screen */}
        {gameState === 'leaderboard' && (
          <div className="bg-slate-900 border border-slate-800 rounded-[2rem] overflow-hidden animate-in fade-in">
             <div className="p-8 border-b border-slate-800 flex justify-between items-center bg-slate-800/20">
               <h2 className="text-2xl font-black uppercase tracking-tight flex items-center gap-3">
                 <Trophy className="text-yellow-500" /> Leaderboard
               </h2>
               <button onClick={() => setGameState('start')} className="p-2 bg-slate-950 border border-slate-800 rounded-lg"><X /></button>
             </div>
             <div className="p-4 max-h-[400px] overflow-y-auto">
                {leaderboard.length === 0 ? <p className="p-16 text-center text-slate-600 font-bold">තවමත් දත්ත නැත...</p> : 
                  leaderboard.map((e, idx) => (
                    <div key={e.id} className="flex items-center justify-between p-5 hover:bg-slate-800/50 rounded-2xl mb-1 border-b border-slate-800/50 last:border-0">
                      <div className="flex items-center gap-5">
                        <span className={`w-8 h-8 rounded-lg flex items-center justify-center font-black ${idx < 3 ? 'bg-blue-600 text-white shadow-lg shadow-blue-900/40' : 'bg-slate-950 text-slate-500'}`}>{idx + 1}</span>
                        <div>
                          <p className="font-bold text-slate-200">{e.name}</p>
                          <p className="text-[10px] text-slate-500 uppercase font-bold tracking-widest">Paper {e.paperId}</p>
                        </div>
                      </div>
                      <span className="text-2xl font-black text-blue-500">{e.score}</span>
                    </div>
                  ))
                }
             </div>
             <div className="p-8 border-t border-slate-800 bg-slate-950/30">
               <button onClick={() => setGameState('start')} className="w-full bg-slate-800 py-4 rounded-xl font-black hover:bg-slate-700 transition-all text-white">මුල් පිටුවට</button>
             </div>
          </div>
        )}
        
      </div>
      <footer className="mt-12 text-center text-slate-800 text-[10px] font-black tracking-[0.5em] uppercase">COMMERCE QUEST • 2024</footer>
    </div>
  );
}