import Typography from 'components/atoms/typography/typography';
import Button from 'components/molecules/button/button';
import Column from 'components/utilities/column/column';
import Row from 'components/utilities/row/row';
import {
  GetGlobalContentItemsResponse,
  UpdatedContentItem,
} from 'integrations/content/amplience/endpoints/management/content-management.types';
import { getUrlLinkForContentItem } from 'integrations/content/amplience/endpoints/management/content-management-helper-functions';
import { GlobalToLocalContentOverviewProps } from '../overview';
import styles from './localize-content-items.module.scss';

interface LocalizeContentItemProps {
  buttonText: string;
  contentItems: GetGlobalContentItemsResponse['contentItems'];
  openLocalizeView: GlobalToLocalContentOverviewProps['openLocalizeView'];
  toggleButton?: {
    onClick: (value: UpdatedContentItem) => void;
    text: string;
  };
}

const LocalizeContentItems = ({
  buttonText,
  contentItems,
  openLocalizeView,
  toggleButton,
}: LocalizeContentItemProps) => {
  if (contentItems.length === 0) {
    return null;
  }

  return (
    <div className={styles.component}>
      {contentItems.map((item) => (
        <Row key={item.id} classNameOuter={styles.row}>
          <Column className={styles.contentItemName} width={{ mobile: 4 }}>
            <Button
              link={{
                externalLink: getUrlLinkForContentItem(item.id),
                target: '_blank',
              }}
              text={item.body?._meta.name}
              variant="Text"
            />
          </Column>
          <Column className={styles.timestamp} width={{ mobile: 4 }}>
            <Typography tag="span" tagStyle="actionMedium">
              {new Date(item.lastModifiedDate).toDateString()}
            </Typography>
          </Column>
          <Column className={styles.buttons} width={{ mobile: 4 }}>
            {toggleButton && (
              <Button
                onClick={() => toggleButton.onClick(item)}
                size="small"
                text={toggleButton.text}
                variant="Text"
              />
            )}
            <Button
              onClick={() => {
                openLocalizeView(item);
              }}
              size="small"
              text={buttonText}
              variant="Primary"
            />
          </Column>
        </Row>
      ))}
    </div>
  );
};

export default LocalizeContentItems;
