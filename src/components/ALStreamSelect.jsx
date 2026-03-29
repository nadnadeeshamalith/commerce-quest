import React from 'react';
import { 
  ArrowLeft, ArrowRight, 
  Atom, Briefcase, Cpu, Palette, GraduationCap,
  Beaker, Zap, Leaf, Calculator, Monitor, LineChart, BarChart, 
  Microscope, Wrench, Globe, BookOpen, Camera, Music, Heart, Star, Brain
} from 'lucide-react';

export default function ALStreamSelect({ 
  onBack = () => alert("ප්‍රධාන මෙනුවට (Main Menu) යාමට බොත්තම එබුවා!"), 
  onStreamSelect = (stream) => alert(`ඔබ තෝරාගත්තේ: ${stream} අංශයයි.`),
  view = 'main',
  setView = () => {}
}) {
  
  // const [view, setView] = useState('main'); // Moved to App.jsx to persist view on back button

  return (
    <div className="flex flex-col items-center justify-center py-12 animate-in zoom-in duration-500 min-h-[80vh] w-full max-w-6xl mx-auto px-4">
      
      {/* MAIN CATEGORY SELECTION (ප්‍රධාන අංශ තේරීම) */}
      {view === 'main' && (
        <>
          <button onClick={onBack} className="self-start p-3 hover:bg-slate-900 rounded-xl mb-8 flex items-center gap-2 text-slate-400 hover:text-white border border-slate-800 shadow-md font-bold transition-all">
            <ArrowLeft className="w-5 h-5" /> ආපසු
          </button>
          
          <h1 className="text-3xl md:text-5xl font-black mb-4 text-white drop-shadow-lg text-center tracking-tight">
            උසස් පෙළ අංශය තෝරන්න
          </h1>
          <p className="text-slate-400 font-bold mb-16 text-center">ඔබේ ප්‍රියතම විෂය ධාරාව තෝරා අභියෝගය ආරම්භ කරන්න</p>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 w-full">
              
              {/* 1. Bio Science Stream */}
              <div 
                onClick={() => setView('bio_category')} 
                className="cursor-pointer group relative bg-slate-900/80 border-2 border-emerald-500/20 rounded-[2.5rem] p-10 hover:border-emerald-500 hover:bg-emerald-900/20 transition-all flex flex-col items-center text-center shadow-2xl hover:-translate-y-2"
              >
                  <div className="absolute top-0 left-0 w-32 h-32 bg-emerald-500/10 rounded-full blur-3xl group-hover:bg-emerald-500/20 transition-all"></div>
                  <div className="bg-emerald-500/20 p-5 rounded-3xl mb-6 text-emerald-400 group-hover:scale-110 transition-transform duration-300">
                    <Microscope className="w-16 h-16" />
                  </div>
                  <h3 className="text-2xl font-black text-white mb-2">ජීව විද්‍යා විෂය ධාරාව</h3>
                  <p className="text-emerald-300/50 text-sm font-bold mt-2 uppercase tracking-widest">Bio Science Stream</p>
                  <span className="text-emerald-400 font-bold text-sm flex items-center gap-2 mt-8 opacity-0 group-hover:opacity-100 transition-opacity">
                    ඇතුල් වන්න <ArrowRight className="w-4 h-4 group-hover:translate-x-2 transition-transform" />
                  </span>
              </div>

              {/* 2. Physical Science / Maths Stream */}
              <div 
                onClick={() => setView('maths_category')} 
                className="cursor-pointer group relative bg-slate-900/80 border-2 border-blue-500/20 rounded-[2.5rem] p-10 hover:border-blue-500 hover:bg-blue-900/20 transition-all flex flex-col items-center text-center shadow-2xl hover:-translate-y-2"
              >
                  <div className="absolute top-0 right-0 w-32 h-32 bg-blue-500/10 rounded-full blur-3xl group-hover:bg-blue-500/20 transition-all"></div>
                  <div className="bg-blue-500/20 p-5 rounded-3xl mb-6 text-blue-400 group-hover:scale-110 transition-transform duration-300">
                    <Calculator className="w-16 h-16" />
                  </div>
                  <h3 className="text-2xl font-black text-white mb-2">ගණිත විෂය ධාරාව</h3>
                  <p className="text-blue-300/50 text-sm font-bold mt-2 uppercase tracking-widest">Maths Stream (Physical Science)</p>
                  <span className="text-blue-400 font-bold text-sm flex items-center gap-2 mt-8 opacity-0 group-hover:opacity-100 transition-opacity">
                    ඇතුල් වන්න <ArrowRight className="w-4 h-4 group-hover:translate-x-2 transition-transform" />
                  </span>
              </div>

              {/* 3. Commerce Stream */}
              <div 
                onClick={() => setView('commerce_category')} 
                className="cursor-pointer group relative bg-slate-900/80 border-2 border-amber-500/20 rounded-[2.5rem] p-10 hover:border-amber-500 hover:bg-amber-900/20 transition-all flex flex-col items-center text-center shadow-2xl hover:-translate-y-2"
              >
                  <div className="absolute bottom-0 left-0 w-32 h-32 bg-amber-500/10 rounded-full blur-3xl group-hover:bg-amber-500/20 transition-all"></div>
                  <div className="bg-amber-500/20 p-5 rounded-3xl mb-6 text-amber-400 group-hover:scale-110 transition-transform duration-300">
                    <Briefcase className="w-16 h-16" />
                  </div>
                  <h3 className="text-2xl font-black text-white mb-2">වාණිජ විෂය ධාරාව</h3>
                  <p className="text-amber-300/50 text-sm font-bold mt-2 uppercase tracking-widest">Commerce Stream</p>
                  <span className="text-amber-400 font-bold text-sm flex items-center gap-2 mt-8 opacity-0 group-hover:opacity-100 transition-opacity">
                    ඇතුල් වන්න <ArrowRight className="w-4 h-4 group-hover:translate-x-2 transition-transform" />
                  </span>
              </div>

              {/* 4. Technology Stream */}
              <div 
                onClick={() => setView('tech_category')} 
                className="cursor-pointer group relative bg-slate-900/80 border-2 border-orange-500/20 rounded-[2.5rem] p-10 hover:border-orange-500 hover:bg-orange-900/20 transition-all flex flex-col items-center text-center shadow-2xl hover:-translate-y-2"
              >
                  <div className="absolute top-0 right-0 w-32 h-32 bg-orange-500/10 rounded-full blur-3xl group-hover:bg-orange-500/20 transition-all"></div>
                  <div className="bg-orange-500/20 p-5 rounded-3xl mb-6 text-orange-400 group-hover:scale-110 transition-transform duration-300">
                    <Cpu className="w-16 h-16" />
                  </div>
                  <h3 className="text-2xl font-black text-white mb-2">තාක්ෂණවේදය</h3>
                  <p className="text-orange-300/50 text-sm font-bold mt-2 uppercase tracking-widest">Technology Stream</p>
                  <span className="text-orange-400 font-bold text-sm flex items-center gap-2 mt-8 opacity-0 group-hover:opacity-100 transition-opacity">
                    ඇතුල් වන්න <ArrowRight className="w-4 h-4 group-hover:translate-x-2 transition-transform" />
                  </span>
              </div>

              {/* 5. Arts Stream */}
              <div 
                onClick={() => setView('arts_category')} 
                className="cursor-pointer group relative bg-slate-900/80 border-2 border-pink-500/20 rounded-[2.5rem] p-10 hover:border-pink-500 hover:bg-pink-900/20 transition-all flex flex-col items-center text-center shadow-2xl hover:-translate-y-2"
              >
                  <div className="absolute bottom-0 right-0 w-32 h-32 bg-pink-500/10 rounded-full blur-3xl group-hover:bg-pink-500/20 transition-all"></div>
                  <div className="bg-pink-500/20 p-5 rounded-3xl mb-6 text-pink-400 group-hover:scale-110 transition-transform duration-300">
                    <Palette className="w-16 h-16" />
                  </div>
                  <h3 className="text-2xl font-black text-white mb-2">කලා විෂය ධාරාව</h3>
                  <p className="text-pink-300/50 text-sm font-bold mt-2 uppercase tracking-widest">Arts Stream</p>
                  <span className="text-pink-400 font-bold text-sm flex items-center gap-2 mt-8 opacity-0 group-hover:opacity-100 transition-opacity">
                    ඇතුල් වන්න <ArrowRight className="w-4 h-4 group-hover:translate-x-2 transition-transform" />
                  </span>
              </div>

              {/* 6. Professional / Others */}
              <div 
                onClick={() => alert("අනෙකුත් අංශ ළඟදීම බලාපොරොත්තු වන්න!")} 
                className="cursor-not-allowed group relative bg-slate-900/40 border-2 border-slate-800 rounded-[2.5rem] p-10 flex flex-col items-center text-center opacity-60 transition-all"
              >
                  <div className="bg-slate-800 p-5 rounded-3xl mb-6 text-slate-500">
                    <GraduationCap className="w-16 h-16" />
                  </div>
                  <h3 className="text-2xl font-black text-slate-500 mb-2">අනෙකුත් අංශ</h3>
                  <p className="text-slate-600 text-sm font-bold mt-2 uppercase tracking-widest">Coming Soon</p>
              </div>

          </div>
        </>
      )}

      {/* BIO CATEGORY VIEW */}
      {view === 'bio_category' && (
        <div className="w-full animate-in slide-in-from-right duration-500 flex flex-col">
            <button 
  onClick={() => setView('main')}
  className="self-start p-3 hover:bg-slate-900 rounded-xl mb-8 flex items-center gap-2 text-slate-400 hover:text-white border border-slate-800 shadow-md font-bold transition-all"
>
  <ArrowLeft className="w-5 h-5" /> ආපසු
</button>
            
            <div className="inline-flex mx-auto items-center gap-2 px-5 py-2.5 rounded-full bg-emerald-500/10 border border-emerald-500/30 text-emerald-400 font-bold text-sm mb-6 shadow-[0_0_20px_rgba(16,185,129,0.2)]">
               <Microscope className="w-5 h-5" /> ජීව විද්‍යා විෂය ධාරාව (Bio Science Stream)
            </div>

            <h2 className="text-3xl md:text-5xl font-black mb-16 text-white text-center tracking-tight">විෂය තෝරන්න</h2>
            
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
              {[
                {id:'biology', n:'ජීව විද්‍යාව', sub:'Biology', Icon: Microscope, c:'emerald'},
                {id:'chemistry', n:'රසායන විද්‍යාව', sub:'Chemistry', Icon: Beaker, c:'cyan'},
                {id:'physics', n:'භෞතික විද්‍යාව', sub:'Physics', Icon: Zap, c:'orange'},
                {id:'agri', n:'කෘෂි විද්‍යාව', sub:'Agricultural Science', Icon: Leaf, c:'green'}
              ].map(cat => (
                <div 
                  key={cat.id}
                  onClick={() => onStreamSelect(cat.id)}
                  className={`cursor-pointer group bg-slate-900/80 border-2 border-${cat.c}-500/20 p-8 rounded-[2rem] hover:border-${cat.c}-500 hover:bg-${cat.c}-900/10 transition-all flex flex-col items-center text-center`}
                >
                  <div className={`p-4 rounded-2xl bg-${cat.c}-500/10 text-${cat.c}-400 mb-5 group-hover:scale-110 transition-transform`}>
                    <cat.Icon />
                  </div>
                  <h4 className="text-xl font-black text-white mb-1">{cat.n}</h4>
                  <p className={`text-${cat.c}-300/40 text-[10px] font-bold uppercase tracking-widest`}>{cat.sub}</p>
                </div>
              ))}
            </div>
        </div>
      )}

      {/* MATHS CATEGORY VIEW */}
      {view === 'maths_category' && (
        <div className="w-full animate-in slide-in-from-right duration-500 flex flex-col">
            <button 
              onClick={() => setView('main')}
              className="self-start p-3 hover:bg-slate-900 rounded-xl mb-8 flex items-center gap-2 text-slate-400 hover:text-white border border-slate-800 shadow-md font-bold transition-all"
            >
              <ArrowLeft className="w-5 h-5" /> ආපසු
            </button>
            
            <div className="inline-flex mx-auto items-center gap-2 px-5 py-2.5 rounded-full bg-blue-500/10 border border-blue-500/30 text-blue-400 font-bold text-sm mb-6 shadow-[0_0_20px_rgba(59,130,246,0.2)]">
               <Calculator className="w-5 h-5" /> ගණිත විෂය ධාරාව (Maths Stream)
            </div>

            <h2 className="text-3xl md:text-5xl font-black mb-16 text-white text-center tracking-tight">විෂය තෝරන්න</h2>
            
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
              {[
                {id:'combined_maths', n:'සංයුක්ත ගණිතය', sub:'Combined Mathematics', Icon: Calculator, c:'violet'},
                {id:'physics_maths', n:'භෞතික විද්‍යාව', sub:'Physics', Icon: Zap, c:'orange'},
                {id:'chemistry_maths', n:'රසායන විද්‍යාව', sub:'Chemistry', Icon: Beaker, c:'blue'},
                {id:'ict_maths', n:'ICT', sub:'Information Technology', Icon: Monitor, c:'slate'}
              ].map(cat => (
                <div 
                  key={cat.id}
                  onClick={() => onStreamSelect(cat.id)}
                  className={`cursor-pointer group bg-slate-900/80 border-2 border-${cat.c}-500/20 p-8 rounded-[2rem] hover:border-${cat.c}-500 hover:bg-${cat.c}-900/10 transition-all flex flex-col items-center text-center`}
                >
                  <div className={`p-4 rounded-2xl bg-${cat.c}-500/10 text-${cat.c}-400 mb-5 group-hover:scale-110 transition-transform`}>
                    <cat.Icon />
                  </div>
                  <h4 className="text-xl font-black text-white mb-1">{cat.n}</h4>
                  <p className={`text-${cat.c}-300/40 text-[10px] font-bold uppercase tracking-widest`}>{cat.sub}</p>
                </div>
              ))}
            </div>
        </div>
      )}

      {/* COMMERCE CATEGORY VIEW */}
      {view === 'commerce_category' && (
        <div className="w-full animate-in slide-in-from-right duration-500 flex flex-col">
            <button 
              onClick={() => setView('main')}
              className="self-start p-3 hover:bg-slate-900 rounded-xl mb-8 flex items-center gap-2 text-slate-400 hover:text-white border border-slate-800 shadow-md font-bold transition-all"
            >
              <ArrowLeft className="w-5 h-5" /> ආපසු
            </button>
            
            <div className="inline-flex mx-auto items-center gap-2 px-5 py-2.5 rounded-full bg-amber-500/10 border border-amber-500/30 text-amber-400 font-bold text-sm mb-6 shadow-[0_0_20px_rgba(245,158,11,0.2)]">
               <Briefcase className="w-5 h-5" /> වාණිජ විෂය ධාරාව (Commerce Stream)
            </div>

            <h2 className="text-3xl md:text-5xl font-black mb-16 text-white text-center tracking-tight">විෂය තෝරන්න</h2>
            
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
              {[
                {id:'business_studies', n:'ව්‍යාපාර අධ්‍යයනය', sub:'Business Studies', Icon: Briefcase, c:'amber'},
                {id:'accounting', n:'ගිණුම්කරණය', sub:'Accounting', Icon: Calculator, c:'blue'},
                {id:'economics', n:'ආර්ථික විද්‍යාව', sub:'Economics', Icon: LineChart, c:'emerald'},
                {id:'ict_commerce', n:'ICT', sub:'Information Technology', Icon: Monitor, c:'indigo'}
              ].map(cat => (
                <div 
                  key={cat.id}
                  onClick={() => onStreamSelect(cat.id)}
                  className={`cursor-pointer group bg-slate-900/80 border-2 border-${cat.c}-500/20 p-8 rounded-[2rem] hover:border-${cat.c}-500 hover:bg-${cat.c}-900/10 transition-all flex flex-col items-center text-center`}
                >
                  <div className={`p-4 rounded-2xl bg-${cat.c}-500/10 text-${cat.c}-400 mb-5 group-hover:scale-110 transition-transform`}>
                    <cat.Icon />
                  </div>
                  <h4 className="text-xl font-black text-white mb-1">{cat.n}</h4>
                  <p className={`text-${cat.c}-300/40 text-[10px] font-bold uppercase tracking-widest`}>{cat.sub}</p>
                </div>
              ))}
            </div>
        </div>
      )}

      {/* TECH CATEGORY VIEW */}
      {view === 'tech_category' && (
        <div className="w-full animate-in slide-in-from-right duration-500 flex flex-col">
            <button 
              onClick={() => setView('main')}
              className="self-start p-3 hover:bg-slate-900 rounded-xl mb-8 flex items-center gap-2 text-slate-400 hover:text-white border border-slate-800 shadow-md font-bold transition-all"
            >
              <ArrowLeft className="w-5 h-5" /> ආපසු
            </button>
            
            <div className="inline-flex mx-auto items-center gap-2 px-5 py-2.5 rounded-full bg-orange-500/10 border border-orange-500/30 text-orange-400 font-bold text-sm mb-6 shadow-[0_0_20px_rgba(249,115,22,0.2)]">
               <Cpu className="w-5 h-5" /> තාක්ෂණවේදය විෂය ධාරාව (Technology Stream)
            </div>

            <h2 className="text-3xl md:text-5xl font-black mb-16 text-white text-center tracking-tight">විෂය තෝරන්න</h2>
            
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
              {[
                {id:'sft', n:'SFT', sub:'Science for Technology', Icon: Beaker, c:'orange'},
                {id:'et', n:'ET', sub:'Engineering Technology', Icon: Wrench, c:'blue'},
                {id:'bst', n:'BST', sub:'Bio Systems Technology', Icon: Leaf, c:'emerald'},
                {id:'ict_tech', n:'ICT', sub:'Information Technology', Icon: Monitor, c:'indigo'}
              ].map(cat => (
                <div 
                  key={cat.id}
                  onClick={() => onStreamSelect(cat.id)}
                  className={`cursor-pointer group bg-slate-900/80 border-2 border-${cat.c}-500/20 p-8 rounded-[2rem] hover:border-${cat.c}-500 hover:bg-${cat.c}-900/10 transition-all flex flex-col items-center text-center`}
                >
                  <div className={`p-4 rounded-2xl bg-${cat.c}-500/10 text-${cat.c}-400 mb-5 group-hover:scale-110 transition-transform`}>
                    <cat.Icon />
                  </div>
                  <h4 className="text-xl font-black text-white mb-1">{cat.n}</h4>
                  <p className={`text-${cat.c}-300/40 text-[10px] font-bold uppercase tracking-widest`}>{cat.sub}</p>
                </div>
              ))}
            </div>
        </div>
      )}

      {/* ARTS CATEGORY VIEW */}
      {view === 'arts_category' && (
        <div className="w-full animate-in slide-in-from-right duration-500 flex flex-col overflow-y-auto max-h-[80vh] pr-4">
            <button 
              onClick={() => setView('main')}
              className="self-start p-3 hover:bg-slate-900 rounded-xl mb-8 flex items-center gap-2 text-slate-400 hover:text-white border border-slate-800 shadow-md font-bold transition-all"
            >
              <ArrowLeft className="w-5 h-5" /> ආපසු
            </button>
            
            <div className="inline-flex mx-auto items-center gap-2 px-5 py-2.5 rounded-full bg-pink-500/10 border border-pink-500/30 text-pink-400 font-bold text-sm mb-6 shadow-[0_0_20px_rgba(236,72,153,0.2)]">
               <Palette className="w-5 h-5" /> කලා විෂය ධාරාව (Arts Stream)
            </div>

            <h2 className="text-3xl md:text-5xl font-black mb-16 text-white text-center tracking-tight">විෂය තෝරන්න</h2>
            
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 pb-12">
              {[
                {id:'sinhala', n:'සිංහල', sub:'Sinhala', i:<BookOpen/>, c:'pink'},
                {id:'tamil', n:'දෙමළ', sub:'Tamil', i:<BookOpen/>, c:'pink'},
                {id:'english', n:'ඉංග්‍රීසි', sub:'English', i:<BookOpen/>, c:'pink'},
                {id:'japanese', n:'ජපන්', sub:'Japanese', i:<BookOpen/>, c:'pink'},
                {id:'french', n:'ප්‍රංශ', sub:'French', i:<BookOpen/>, c:'pink'},
                {id:'hindi', n:'හින්දි', sub:'Hindi', i:<BookOpen/>, c:'pink'},
                {id:'pol_sci', n:'දේශපාලන විද්‍යාව', sub:'Political Science', i:<Globe/>, c:'rose'},
                {id:'geography_arts', n:'භූගෝල විද්‍යාව', sub:'Geography', i:<Globe/>, c:'blue'},
                {id:'history', n:'ඉතිහාසය', sub:'History', i:<BookOpen/>, c:'amber'},
                {id:'econ_arts', n:'ආර්ථික විද්‍යාව', sub:'Economics', i:<LineChart/>, c:'sky'},
                {id:'psychology', n:'මනෝ විද්‍යාව', sub:'Psychology', i:<Brain/>, c:'purple'},
                {id:'art', n:'චිත්‍ර', sub:'Art', i:<Palette/>, c:'fuchsia'},
                {id:'music', n:'සංගීතය', sub:'Music', i:<Music/>, c:'violet'},
                {id:'dance', n:'නර්තනය', sub:'Dancing', i:<Zap/>, c:'rose'},
                {id:'drama', n:'නාට්‍ය හා රංග කලාව', sub:'Drama', i:<Camera/>, c:'orange'},
                {id:'logic', n:'තර්ක ශාස්ත්‍රය', sub:'Logic', i:<Brain/>, c:'indigo'},
                {id:'buddhist_civ', 'n':'බෞද්ධ ශිෂ්ටාචාරය', sub:'Buddhist Civ', i:<BookOpen/>, c:'yellow'},
                {id:'christian_civ', 'n':'ක්‍රිස්තියානි ශිෂ්ටාචාරය', sub:'Christian Civ', i:<Heart/>, c:'blue'},
                {id:'media', n:'මාධ්‍ය අධ්‍යයනය', sub:'Media Studies', i:<Camera/>, c:'red'},
                {id:'ict_arts', n:'ICT', sub:'Information Technology', i:<Monitor/>, c:'slate'}
              ].map(cat => (
                <div 
                  key={cat.id}
                  onClick={() => onStreamSelect(cat.id)}
                  className={`cursor-pointer group bg-slate-900/80 border-2 border-${cat.c}-500/20 p-8 rounded-[2rem] hover:border-${cat.c}-500 hover:bg-${cat.c}-900/10 transition-all flex flex-col items-center text-center`}
                >
                  <div className={`p-4 rounded-2xl bg-${cat.c}-500/10 text-${cat.c}-400 mb-5 group-hover:scale-110 transition-transform`}>
                    {cat.i}
                  </div>
                  <h4 className="text-xl font-black text-white mb-1">{cat.n}</h4>
                  <p className={`text-${cat.c}-300/40 text-[10px] font-bold uppercase tracking-widest`}>{cat.sub}</p>
                </div>
              ))}
            </div>
        </div>
      )}

    </div>
  );
}
