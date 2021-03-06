import React from 'react';
import {
  List,
  ListItem,
  Icon,
  Picker,
  Left,
  Right,
} from 'native-base';
import { Linking, Alert } from 'react-native';
import Page from '../../components/Page';
import { Text } from '../../components';
import styles from './styles';
import translate from '../../services/translate';
import { CGU_URL, LEGAL_NOTICE_URL, PRIVACY_POLICY_URL, CONTACT_EMAIL } from '../../config/constants';


type PropsType = {
  navigation: any,
  currentLanguage: string,
  switchLanguage: () => void,
};

export default class Settings extends React.Component<PropsType> {
  getLanguageLabel(languageCode: string) {
    switch (languageCode) {
      case 'en':
        return 'English';
      case 'fr':
        return 'Français';
      default:
        return '';
    }
  }

  openLink(url) {
    try {
      Linking.openURL(url);
    } catch (error) {
      Alert.alert(error.message);
    }
  }

  onValueChange(value: String) {
    this.props.switchLanguage(value);
  }

  render() {
    const { currentLanguage } = this.props;
    const languageLabel = this.getLanguageLabel(currentLanguage);
    return (
      <Page padder={false} contentContainerStyle={styles.page}>
        <List>
          <ListItem itemDivider>
            <Text>applicationSettings</Text>
          </ListItem>
          <ListItem>
            <Picker
              placeholder={languageLabel}
              mode="modal"
              placeholderStyle={styles.pickerText}
              iosIcon={<Icon name="arrow-forward" />}
              selectedValue={this.props.currentLanguage}
              headerBackButtonText={translate('back', null, currentLanguage)}
              onValueChange={value => this.onValueChange(value)}
            >
              <Picker.Item label="Français" value="fr" />
              <Picker.Item label="English" value="en" />
            </Picker>
          </ListItem>
          <ListItem itemDivider>
            <Text>about</Text>
          </ListItem>
          <ListItem onPress={() => this.openLink(CGU_URL)}>
            <Left>
              <Text>
                cgu
              </Text>
            </Left>
            <Right>
              <Icon name="arrow-forward" />
            </Right>
          </ListItem>
          <ListItem onPress={() => this.openLink(PRIVACY_POLICY_URL)}>
            <Left>
              <Text>
                privacyPolicy
              </Text>
            </Left>
            <Right>
              <Icon name="arrow-forward" />
            </Right>
          </ListItem>
          <ListItem onPress={() => this.openLink(LEGAL_NOTICE_URL)}>
            <Left>
              <Text>
                legalNotice
              </Text>
            </Left>
            <Right>
              <Icon name="arrow-forward" />
            </Right>
          </ListItem>
          <ListItem onPress={() => this.openLink(`mailto:${CONTACT_EMAIL}`)}>
            <Left>
              <Text>
                contactUs
              </Text>
            </Left>
            <Right>
              <Icon name="arrow-forward" />
            </Right>
          </ListItem>
          <ListItem>
            <Left>
              <Text>
                version
              </Text>
            </Left>
            <Right>
              <Text note skipTranslation>
                1.0.0
              </Text>
            </Right>
          </ListItem>
          <ListItem>
            <Left>
              <Text>
                build
              </Text>
            </Left>
            <Right>
              <Text note skipTranslation>
                0001
              </Text>
            </Right>
          </ListItem>
        </List>
      </Page>
    );
  }
}
