import React from 'react';
import Typography from 'components/atoms/typography/typography';
import Column from 'components/utilities/column/column';
import Container from 'components/utilities/container/container';
import ModuleWrapper, {
  ModuleWrapperProps,
} from 'components/utilities/content-modules/module-wrapper/module-wrapper';
import Link from 'components/utilities/link/link';
import Row from 'components/utilities/row/row';
import { ContentPageResponse } from 'integrations/content/amplience/types/content-types';
import { useInternalLinksContext } from 'libraries/contexts/internal-navigation-context';
import styles from './module-sitemap.module.scss';

export interface ModuleSitemapProps extends ModuleWrapperProps {
  headline: string;
}

export interface SitemapNodeProps {
  children: SitemapNodeProps[];
  content: Partial<ContentPageResponse>;
}

const SitemapNode = ({ children, content }: SitemapNodeProps) => {
  const deliveryKey = content?._meta?.deliveryKeys?.values[0]
    ? content._meta.deliveryKeys.values[0].value
    : content?._meta?.deliveryKey;

  if (!deliveryKey) return;

  const text = content?.pageNavigation?.breadcrumbName
    ? content.pageNavigation.breadcrumbName.split('|')[0].trim() // We only want the first part of the breadcrumbName
    : content._meta?.name;

  return (
    <React.Fragment>
      <Link
        className={styles.sitemapLink}
        link={{ internalLink: deliveryKey }}
        target="_self"
      >
        {text}
      </Link>
      {!!children?.length && (
        <div className={styles.leftPad}>
          {children.map((node, index) => (
            <SitemapNode
              key={`${content._meta?.name}_${node.content._meta?.name}_${index}`}
              {...node}
            />
          ))}
        </div>
      )}
    </React.Fragment>
  );
};

const ModuleSitemap = ({ headline, ...rest }: ModuleSitemapProps) => {
  const { hierarchy } = useInternalLinksContext();

  return (
    <ModuleWrapper {...rest}>
      <Container>
        <Row outerGutter={{ mobile: 'medium', tablet: 'none' }}>
          <Column
            offset={{
              desktop: 3,
              laptop: 3,
              mobile: 0,
              tablet: 3,
            }}
            width={{
              desktop: 6,
              laptop: 6,
              mobile: 12,
              tablet: 6,
            }}
          >
            <Typography
              className={styles.headline}
              tag="h2"
              tagStyle="displaySmall"
              weight="heavy"
            >
              {headline}
            </Typography>
            {!!hierarchy?.children?.length &&
              hierarchy?.children.map((node, index) => (
                <SitemapNode
                  key={`root_${node.content._meta?.name}_${index}`}
                  {...node}
                />
              ))}
          </Column>
        </Row>
      </Container>
    </ModuleWrapper>
  );
};

ModuleSitemap.displayName = 'ModuleSitemap';

export default ModuleSitemap;
