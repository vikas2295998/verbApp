// main.js

// Load verb data from the verbs.js file
// const verbs = {
//     "Acquire": { base: "acquire", past: "acquired", pastParticiple: "acquired", meaning: "प्राप्त करना" },
//     "Assess": { base: "assess", past: "assessed", pastParticiple: "assessed", meaning: "मूल्यांकन करना" },
//     "Capitalize": { base: "capitalize", past: "capitalized", pastParticiple: "capitalized", meaning: "पूंजीकरण करना" },
//     "Clarify": { base: "clarify", past: "clarified", pastParticiple: "clarified", meaning: "स्पष्ट करना" },
//     "Delegate": { base: "delegate", past: "delegated", pastParticiple: "delegated", meaning: "प्रतिनिधि बनाना" },
//     "Facilitate": { base: "facilitate", past: "facilitated", pastParticiple: "facilitated", meaning: "सुगम बनाना" },
//     "Integrate": { base: "integrate", past: "integrated", pastParticiple: "integrated", meaning: "एकीकृत करना" },
//     "Monitor": { base: "monitor", past: "monitored", pastParticiple: "monitored", meaning: "निगरानी करना" },
//     "Prioritize": { base: "prioritize", past: "prioritized", pastParticiple: "prioritized", meaning: "प्राथमिकता देना" },
//     "Revise": { base: "revise", past: "revised", pastParticiple: "revised", meaning: "संशोधित करना" },
//     "Test": { base: "test", past: "tested", pastParticiple: "tested", meaning: "परीक्षण करना" },
//     "Understand": { base: "understand", past: "understood", pastParticiple: "understood", meaning: "समझना" },
//     "Adapt": { base: "adapt", past: "adapted", pastParticiple: "adapted", meaning: "अनुकूलित करना" },
//     "Design": { base: "design", past: "designed", pastParticiple: "designed", meaning: "डिज़ाइन करना" },
//     "Develop": { base: "develop", past: "developed", pastParticiple: "developed", meaning: "विकसित करना" },
//     "Implement": { base: "implement", past: "implemented", pastParticiple: "implemented", meaning: "कार्यान्वित करना" },
//     "Promote": { base: "promote", past: "promoted", pastParticiple: "promoted", meaning: "बढ़ावा देना" },
//     "Validate": { base: "validate", past: "validated", pastParticiple: "validated", meaning: "मान्यता देना" },
//     "Verify": { base: "verify", past: "verified", pastParticiple: "verified", meaning: "सत्यापित करना" },
//     "Coordinate": { base: "coordinate", past: "coordinated", pastParticiple: "coordinated", meaning: "समन्वयित करना" },
//     "Generate": { base: "generate", past: "generated", pastParticiple: "generated", meaning: "उत्पन्न करना" },
//     "Review": { base: "review", past: "reviewed", pastParticiple: "reviewed", meaning: "पुनरावलोकन करना" },
//     "Summarize": { base: "summarize", past: "summarized", pastParticiple: "summarized", meaning: "संक्षेप में प्रस्तुत करना" },
//     "Update": { base: "update", past: "updated", pastParticiple: "updated", meaning: "अद्यतन करना" },
//     "Allocate": { base: "allocate", past: "allocated", pastParticiple: "allocated", meaning: "आवंटित करना" },
//     "Investigate": { base: "investigate", past: "investigated", pastParticiple: "investigated", meaning: "जांचना" },
//     "Operate": { base: "operate", past: "operated", pastParticiple: "operated", meaning: "संचालित करना" },
//     "Transform": { base: "transform", past: "transformed", pastParticiple: "transformed", meaning: "परिवर्तित करना" }
//     // Add more verbs as needed
//   };

import verbs from './verbs.js'; 
  
  const tableBody = document.getElementById('verb-table-body');
  const pageSizeSelect = document.getElementById('page-size');
  const pageNumberSelect = document.getElementById('page-number');
  const prevButton = document.getElementById('prev-button');
  const nextButton = document.getElementById('next-button');
  
  let currentPage = 1;
  let pageSize = parseInt(pageSizeSelect.value, 10);
  let verbEntries = Object.keys(verbs).map(verb => ({
      verb,
      ...verbs[verb]
  }));
  
  function updatePaginationControls() {
      const totalPages = Math.ceil(verbEntries.length / pageSize);
      
      // Update page number options
      pageNumberSelect.innerHTML = '';
      for (let i = 1; i <= totalPages; i++) {
          const option = document.createElement('option');
          option.value = i;
          option.textContent = i;
          if (i === currentPage) {
              option.selected = true;
          }
          pageNumberSelect.appendChild(option);
      }
      
      prevButton.disabled = currentPage === 1;
      nextButton.disabled = currentPage === totalPages;
  }
  
  function renderVerbTable() {
      const start = (currentPage - 1) * pageSize;
      const end = Math.min(start + pageSize, verbEntries.length);
      
      tableBody.innerHTML = '';
      for (let i = start; i < end; i++) {
          const { verb, base, past, pastParticiple, meaning } = verbEntries[i];
  
          const row = document.createElement('tr');
          
          const verbCell = document.createElement('td');
          verbCell.textContent = verb;
          
          const meaningCell = document.createElement('td');
          meaningCell.textContent = meaning || 'N/A';
          
          const baseCell = document.createElement('td');
          baseCell.textContent = base || 'N/A';
          
          const pastCell = document.createElement('td');
          pastCell.textContent = past || 'N/A';
          
          const pastParticipleCell = document.createElement('td');
          pastParticipleCell.textContent = pastParticiple || 'N/A';
          
          row.appendChild(verbCell);
          row.appendChild(meaningCell);
        //   row.appendChild(baseCell);
          row.appendChild(pastCell);
          row.appendChild(pastParticipleCell);
          
          tableBody.appendChild(row);
      }
  }
  
  function updatePage() {
      renderVerbTable();
      updatePaginationControls();
  }
  
  pageSizeSelect.addEventListener('change', () => {
      pageSize = parseInt(pageSizeSelect.value, 10);
      currentPage = 1;  // Reset to first page
      updatePage();
  });
  
  pageNumberSelect.addEventListener('change', () => {
      currentPage = parseInt(pageNumberSelect.value, 10);
      updatePage();
  });
  
  prevButton.addEventListener('click', () => {
      if (currentPage > 1) {
          currentPage--;
          updatePage();
      }
  });
  
  nextButton.addEventListener('click', () => {
      const totalPages = Math.ceil(verbEntries.length / pageSize);
      if (currentPage < totalPages) {
          currentPage++;
          updatePage();
      }
  });
  
  // Initial page setup
  updatePage();
  