import gql from 'graphql-tag';
import { print } from 'graphql';

export const getContent = (apiKey, language) => {
  const query = gql`
    query content {
      requestContent(environmentID: "${apiKey}", language: "${language}") {
        body {
          key
          value
        }
      }
    }
  `;
  return { query: print(query), type: 'requestContent' }
}