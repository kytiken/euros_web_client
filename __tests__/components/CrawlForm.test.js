import React from 'react';
import renderer from 'react-test-renderer';
import CrawlForm from '../../components/CrawlForm';
import CrawlError from '../../models/CrawlError';

it('renders correctly', () => {
  const tree = renderer
    .create(<CrawlForm errors={new CrawlError()} createCrawl={() => {}} />)
    .toJSON();
  expect(tree).toMatchSnapshot();
});
