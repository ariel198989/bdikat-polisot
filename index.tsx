import React, { useState } from 'react';
import { HelpCircle, Upload, Info, Check, X, Download } from 'lucide-react';

const PolicyAnalyzer = () => {
  const [policies, setPolicies] = useState([]);
  const [analyzing, setAnalyzing] = useState(false);

  const handleFileUpload = (event) => {
    const file = event.target.files[0];
    if (file && file.type === 'application/pdf') {
      setAnalyzing(true);
      setTimeout(() => {
        const newPolicy = analyzePDF(file);
        setPolicies(prevPolicies => [...prevPolicies, newPolicy]);
        setAnalyzing(false);
      }, 2000);
    } else {
      alert('אנא העלה קובץ PDF תקין');
    }
  };

  const analyzePDF = (file) => {
    // Simulated PDF analysis
    return {
      id: policies.length + 1,
      name: `פוליסה ${policies.length + 1}`,
      company: "הראל חברה לביטוח",
      policyNumber: "506303230",
      issueDate: "29/07/2024",
      totalMonthlyPremium: 318.27,
      insuredPersons: [
        { name: "ממן סמואל משה", id: "302373949", birthDate: "13/06/1989" },
        { name: "ממן מיכל", id: "203176763", birthDate: "30/10/1991" },
        { name: "ממן אריאל", id: "341697159", birthDate: "6/07/2016" },
        { name: "ממן מיתר", id: "228689949", birthDate: "6/07/2019" }
      ],
      coverages: {
        "מענקית זהב (מחלות קשות)": { 
          amount: 205962.70, 
          discount: 35, 
          discountEnd: "06/2025",
          conditions: "תקופת אכשרה: 90 יום. כיסוי למחלות קשות מוגדרות.",
          maxCoverage: "עד 100% מסכום הביטוח"
        },
        "השתלות וטיפולים מיוחדים בחו\"ל": { 
          amount: 5352192.86, 
          discount: 25, 
          discountEnd: "06/2025",
          conditions: "כיסוי מלא להשתלות בהסכם. תקופת אכשרה: 30 יום.",
          maxCoverage: "עד תקרת 5,352,192.86 ש\"ח"
        },
        "ניתוחים וטיפולים בחו\"ל": { 
          amount: 283794.50, 
          discount: 25, 
          discountEnd: "06/2025",
          conditions: "כיסוי לניתוחים פרטיים בחו\"ל. תקופת אכשרה: 90 יום.",
          maxCoverage: "עד 200% מעלות הניתוח בארץ"
        },
        "תרופות מיוחדות": { 
          amount: 1135178.00, 
          discount: 25, 
          discountEnd: "06/2025",
          conditions: "כיסוי לתרופות שאינן בסל הבריאות. השתתפות עצמית: 300 ש\"ח לחודש.",
          maxCoverage: "עד 1,135,178.00 ש\"ח לכל תקופת הביטוח"
        }
      },
      exclusions: [
        { insured: "ממן סמואל משה", condition: "קרון", products: ["מענקית זהב"] },
        { insured: "ממן סמואל משה", condition: "מחלות מעיים דלקתיות כרוניות", products: ["טיפול בטכנולוגיות ואביזר רפואי"] },
        { insured: "ממן סמואל משה", condition: "מפרק ירך שמאל", products: ["טיפול בטכנולוגיות ואביזר רפואי"] }
      ],
      additions: [
        { insured: "ממן סמואל משה", condition: "קרון", products: ["מענקית זהב"], addition: 25 }
      ]
    };
  };

  const formatNumber = (num) => {
    return num.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
  };

  const PolicyCard = ({ policy }) => (
    <div className="bg-white p-6 rounded-lg shadow-lg mb-6">
      <h2 className="text-2xl font-bold mb-4 text-blue-600">{policy.name}</h2>
      <div className="grid grid-cols-2 gap-4">
        <div>
          <p className="font-semibold">חברה:</p>
          <p>{policy.company}</p>
        </div>
        <div>
          <p className="font-semibold">מספר פוליסה:</p>
          <p>{policy.policyNumber}</p>
        </div>
        <div>
          <p className="font-semibold">תאריך הפקה:</p>
          <p>{policy.issueDate}</p>
        </div>
        <div>
          <p className="font-semibold">פרמיה חודשית:</p>
          <p>₪{formatNumber(policy.totalMonthlyPremium)}</p>
        </div>
      </div>
      <h3 className="font-bold mt-4 mb-2">מבוטחים:</h3>
      <div className="grid grid-cols-2 gap-2">
        {policy.insuredPersons.map((person, idx) => (
          <div key={idx} className="bg-gray-100 p-2 rounded">
            <p className="font-semibold">{person.name}</p>
            <p className="text-sm">ת.ז: {person.id}</p>
            <p className="text-sm">תאריך לידה: {person.birthDate}</p>
          </div>
        ))}
      </div>
    </div>
  );

  const CoverageDetails = ({ coverage, details }) => (
    <div className="bg-white p-4 rounded-lg shadow mb-4">
      <h3 className="text-lg font-semibold mb-2">{coverage}</h3>
      <p>סכום כיסוי: ₪{formatNumber(details.amount)}</p>
      <p>הנחה: {details.discount}% עד {details.discountEnd}</p>
      <p>תנאים: {details.conditions}</p>
      <p>תקרת כיסוי: {details.maxCoverage}</p>
    </div>
  );

  const ExclusionsAndAdditions = ({ policy }) => (
    <div className="bg-white p-6 rounded-lg shadow-lg mb-6">
      <h3 className="text-xl font-bold text-blue-600 mb-4">החרגות ותוספות</h3>
      {policy.exclusions.length > 0 && (
        <div className="mb-4">
          <h4 className="font-semibold text-lg mb-2">החרגות:</h4>
          <ul className="list-disc list-inside">
            {policy.exclusions.map((exclusion, index) => (
              <li key={index} className="text-red-600">
                {exclusion.insured}: {exclusion.condition} ({exclusion.products.join(', ')})
              </li>
            ))}
          </ul>
        </div>
      )}
      {policy.additions.length > 0 && (
        <div>
          <h4 className="font-semibold text-lg mb-2">תוספות:</h4>
          <ul className="list-disc list-inside">
            {policy.additions.map((addition, index) => (
              <li key={index} className="text-green-600">
                {addition.insured}: {addition.condition} - תוספת {addition.addition}% ({addition.products.join(', ')})
              </li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );

  const exportData = () => {
    const data = policies.map(policy => JSON.stringify(policy, null, 2)).join('\n\n');
    const blob = new Blob([data], { type: 'text/plain' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.download = 'insurance_analysis.txt';
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    URL.revokeObjectURL(url);
  };

  return (
    <div className="container mx-auto p-8 bg-gray-100 min-h-screen">
      <h1 className="text-4xl font-bold mb-8 text-center text-blue-800">
        מנתח פוליסות ביטוח חכם
      </h1>
      
      <div className="mb-8">
        <label className="block mb-2 font-semibold text-lg">
          העלה קובץ PDF של פוליסת הביטוח:
        </label>
        <input type="file" onChange={handleFileUpload} accept=".pdf" className="w-full p-2 border rounded" />
      </div>

      {analyzing && <div className="text-center mb-6">מנתח את הפוליסה...</div>}

      {policies.map((policy) => (
        <div key={policy.id}>
          <PolicyCard policy={policy} />
          {Object.entries(policy.coverages).map(([coverage, details]) => (
            <CoverageDetails key={coverage} coverage={coverage} details={details} />
          ))}
          <ExclusionsAndAdditions policy={policy} />
        </div>
      ))}

      {policies.length > 0 && (
        <button 
          onClick={exportData} 
          className="mt-4 bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600"
        >
          ייצא נתונים
        </button>
      )}

      <div className="mt-8 text-center text-sm text-gray-500">
        כל הזכויות שמורות לאריאל אוחיון
      </div>
    </div>
  );
};

export default PolicyAnalyzer;
