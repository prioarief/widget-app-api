import http from 'k6/http';
import { check, sleep } from 'k6';
import { Counter } from 'k6/metrics';

// Custom metrics
const rateLimitedRequests = new Counter('rate_limited_requests');
const successfulRequests = new Counter('successful_requests');

// Simple configuration for quick rate limit testing
export const options = {
  vus: 1, // 1 virtual user
  duration: '10s',
};

const BASE_URL = __ENV.BASE_URL || 'http://localhost:3000/v1';

export default function () {
  // Test the main endpoint
  const url = `${BASE_URL}/widget/101/posts`;
  
  console.log(`Making request to: ${url}`);
  
  const params = {
    headers: {
      'User-Agent': 'K6-Simple-Test',
    }
  };
  
  const response = http.get(url, params);
  
  // Log the result
  if (response.status === 200) {
    console.log(`✅ Request successful (${response.timings.duration.toFixed(0)}ms)`);
    successfulRequests.add(1);
    
  } else if (response.status === 429) {
    console.log(`🚫 Rate limited! (${response.timings.duration.toFixed(0)}ms)`);
    rateLimitedRequests.add(1);    
  } else {
    console.log(`❌ Unexpected status: ${response.status} (${response.timings.duration.toFixed(0)}ms)`);
  }
  
  // Wait a bit before next request (adjust this to control request rate)
  sleep(0.1);
}

export function setup() {
  // Quick health check
  const healthResponse = http.get(`${BASE_URL}/widget/health/check`);
  if (healthResponse.status !== 200) {
    throw new Error(`API health check failed. Status: ${healthResponse.status}`);
  }
  
  console.log('✅ API is healthy, starting test...');
  return { baseUrl: BASE_URL };
}