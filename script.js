// Replace with your Zoho CRM API details
const clientId = '1000.CWI9FGAQ6H2DJW4O0LW8NLGH62SR0S';
const redirectUri = 'https://oauth.pstmn.io/v1/browser-callback';
const moduleAPIName = 'Deals';

// Zoho CRM API endpoints
const zohoCRMAPIEndpoint = 'https://www.zohoapis.com/crm/v2';
const getRecordByIdMethod = 'zoho.crm.getRecordById';
const getRelatedRecordsMethod = 'zoho.crm.getRelatedRecords';

// Function to get the selected record ID (you need to implement this)
function getSelectedRecordId() {
    // Replace this with your logic to get the selected record ID
    // For example, if you're using Zoho CRM's page, you might extract it from the URL
    const urlParams = new URLSearchParams(window.location.search);
    const recordId = urlParams.get('id');
    return recordId;
}

// Function to calculate commission
function calculateCommission(amount, commissionPercentage) {
    const commission = (amount * commissionPercentage) / 100;
    return commission;
}

// Function to redirect user to Zoho for OAuth authorization
function redirectToZohoAuthorization(clientId, redirectUri, moduleAPIName, recordId, commissionPercentage) {
    const scopes = 'ZohoCRM.modules.ALL,ZohoCRM.settings.ALL'; // Update with the required scopes
    const authorizationUrl = `https://accounts.zoho.com/oauth/v2/auth?client_id=${clientId}&redirect_uri=${redirectUri}&scope=${scopes}&response_type=token&state=${moduleAPIName}-${recordId}-${commissionPercentage}`;

    // Redirect the user to Zoho for authorization
    window.location.href = authorizationUrl;
}

// Function to handle the button click event
$(document).ready(function () {
    $('#calculateCommissionBtn').click(function () {
        // Ask the user to enter the commission percentage
        const commissionPercentage = prompt('Enter Commission Percentage:');

        // If the user cancels the prompt, do nothing
        if (commissionPercentage === null) {
            return;
        }

        // Fetch the selected record ID from Zoho CRM (you need to implement this)
        const recordId = getSelectedRecordId();

        // Redirect user to Zoho for OAuth authorization
        redirectToZohoAuthorization(clientId, redirectUri, moduleAPIName, recordId, commissionPercentage);
    });
});
