import fetch from 'node-fetch';

async function fetchTransaction(txHash: string, blockchain: string = 'btc') {
  const url = `https://api.blockcypher.com/v1/${blockchain}/main/txs/${txHash}`;
  try {
    const response = await fetch(url);
    if (!response.ok) {
      throw new Error(`HTTP error ${response.status}`);
    }
    const data = await response.json();
    console.log(`Transaction hash:`, data.hash);
    console.log(`Total:`, data.total);
    console.log(`Inputs:`, data.inputs.length);
    console.log(`Outputs:`, data.outputs.length);
  } catch (error) {
    console.error('Error fetching transaction:', error);
  }
}

if (require.main === module) {
  const txHash = process.argv[2] || 'sample_tx_hash_here';
  const blockchain = process.argv[3] || 'btc'; // Accept blockchain as optional argument (e.g., btc, eth, ltc)
  fetchTransaction(txHash, blockchain);
}
