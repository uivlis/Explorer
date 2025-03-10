import React from 'react';
import styles from './IssueRatingFormModal.module.scss';
import moment from 'moment';
import { Text } from 'components';
import { FulfillmentStagePill } from 'explorer-components';

const BountyDetails = props => {
  const { bounty } = props;
  const {
    calculated_fulfillment_amount,
    title,
    token_symbol,
    usd_price
  } = bounty;

  const created = moment
    .utc(bounty.bounty_created, 'YYYY-MM-DDThh:mm:ssZ')
    .fromNow();

  return (
    <div className={styles.bountyInfoContainer}>
      <div className={styles.bountyInfo}>
        <FulfillmentStagePill className={styles.pill} accepted={true} />
        <div className={`${styles.rowText} ${styles.detailsGroup}`}>
          <Text inline typeScale="h5" weight="fontWeight-medium">
            {title}
          </Text>
          <Text
            inline
            color="purple"
            typeScale="h5"
            weight="fontWeight-medium"
            className={styles.usd}
          >
            ${usd_price.toFixed(0)}
          </Text>
        </div>
        <div className={styles.rowText}>
          <Text
            inline
            typeScale="Small"
            color="defaultGrey"
            className={styles.details}
          >
            {`Created ${created}`}
          </Text>
          <Text
            inline
            color="defaultGrey"
            typeScale="Small"
            className={styles.usd}
          >
            {`${Number(calculated_fulfillment_amount)} ${token_symbol}`}
          </Text>
        </div>
      </div>
    </div>
  );
};

export default BountyDetails;
