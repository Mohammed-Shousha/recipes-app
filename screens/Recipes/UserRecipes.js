import { useContext } from 'react'
import { ActivityIndicator, ScrollView } from 'react-native'
import { AddButton } from '@components/styles/Buttons.styles'
import { Container, RowContainer } from '@components/styles/Containers.styles.'
import { Icon, RecipeMiniImage } from '@components/styles/Images.styles'
import { Title, Text } from '@components/styles/Texts.styles'
import { DataContext } from '@root/Context'
import cookbook from '@assets/images/cookbook.png'

import { plusIcon } from '@assets/icons'

export const UserRecipes = ({ navigation }) => {
  const { userData, loading } = useContext(DataContext)
  const { recipes } = userData

  return (
    <>
      {loading ? (
        <Container center>
          <ActivityIndicator color="green" size="large" />
        </Container>
      ) : (
        <Container>
          {!recipes || recipes.length === 0 ? (
            <Container center>
              <Icon source={cookbook} size="110" />
              <Title>
                Your recipes book is empty, add your own recipes to get started!
              </Title>
            </Container>
          ) : (
            <ScrollView>
              {recipes.map((recipe) => (
                <RowContainer
                  key={recipe.id}
                  flexStart
                  onPress={() =>
                    navigation.navigate('User Recipe', { id: recipe.id })
                  }
                >
                  <RecipeMiniImage
                    source={{
                      uri: recipe.image
                        ? recipe.image
                        : 'https://source.unsplash.com/Mz__0nr1AM8',
                    }}
                  />
                  <Text style={{ width: 240 }}>{recipe.title}</Text>
                </RowContainer>
              ))}
            </ScrollView>
          )}
          <AddButton onPress={() => navigation.navigate('Add Recipe')}>
            <Icon source={plusIcon} size="25" />
          </AddButton>
        </Container>
      )}
    </>
  )
}
