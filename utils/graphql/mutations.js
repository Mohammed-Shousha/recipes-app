import { gql } from '@apollo/client'

export const HANDLE_REGISTER = gql`
  mutation Register($name: String!, $email: String!, $password: String!) {
    Register(name: $name, email: $email, password: $password) {
      ... on User {
        id
        name
        email
        password
      }
      ... on Error {
        message
      }
    }
  }
`

export const HANDLE_SIGN_IN = gql`
  mutation SignIn($email: String!, $password: String!) {
    SignIn(email: $email, password: $password) {
      ... on User {
        id
        name
        email
        password
        image
        favRecipes {
          id
          title
          image
        }
        recipes {
          id
          title
          time
          type
          ingredients
          directions
          image
        }
      }
      ... on Error {
        message
      }
    }
  }
`

export const HANDLE_GOOGLE_AUTH = gql`
  mutation GoogleAuth($email: String!, $name: String!, $image: String) {
    GoogleAuth(email: $email, name: $name, image: $image) {
      id
      name
      email
      image
      password
      favRecipes {
        id
        title
        image
      }
      recipes {
        id
        title
        time
        type
        ingredients
        directions
        image
      }
    }
  }
`

export const HANDLE_CHANGING_DATA = gql`
  mutation ChangeData($email: String!, $name: String!, $image: String) {
    ChangeData(email: $email, name: $name, image: $image) {
      ... on User {
        id
        name
        email
        image
        password
      }
      ... on Error {
        message
      }
    }
  }
`

export const HANDLE_CHANGING_PASSWORD = gql`
  mutation ChangePassword(
    $email: String!
    $password: String!
    $newPassword: String!
  ) {
    ChangePassword(
      email: $email
      password: $password
      newPassword: $newPassword
    ) {
      ... on User {
        id
        name
        email
      }
      ... on Error {
        message
      }
    }
  }
`

export const HANDLE_ADDING_RECIPE = gql`
  mutation AddRecipe(
    $email: String!
    $title: String!
    $time: Int!
    $type: String!
    $ingredients: String!
    $directions: String!
    $image: String
  ) {
    AddRecipe(
      email: $email
      title: $title
      time: $time
      type: $type
      ingredients: $ingredients
      directions: $directions
      image: $image
    ) {
      data {
        ... on Recipe {
          id
          title
          time
          type
          ingredients
          directions
          image
        }
      }
      result
    }
  }
`

export const HANDLE_EDITING_RECIPE = gql`
  mutation EditRecipe(
    $email: String!
    $id: ID!
    $title: String!
    $time: Int!
    $type: String!
    $ingredients: String!
    $directions: String!
    $image: String
  ) {
    EditRecipe(
      email: $email
      id: $id
      title: $title
      time: $time
      type: $type
      ingredients: $ingredients
      directions: $directions
      image: $image
    ) {
      data {
        ... on Recipe {
          id
          title
          time
          type
          ingredients
          directions
          image
        }
      }
      result
    }
  }
`

export const HANDLE_LIKING_RECIPE = gql`
  mutation LikeRecipe(
    $email: String!
    $id: ID!
    $title: String!
    $image: String!
  ) {
    LikeRecipe(email: $email, id: $id, title: $title, image: $image) {
      data {
        ... on FavRecipe {
          id
          title
          image
        }
      }
      result
    }
  }
`

export const HANDLE_UNLIKING_RECIPE = gql`
  mutation UnlikeRecipe($email: String!, $id: ID!) {
    UnlikeRecipe(email: $email, id: $id) {
      data {
        ... on FavRecipe {
          id
          title
          image
        }
      }
      result
    }
  }
`

export const HANDLE_DELETING_RECIPE = gql`
  mutation DeleteRecipe($email: String!, $id: ID!) {
    DeleteRecipe(email: $email, id: $id) {
      data {
        ... on Recipe {
          id
          title
          time
          type
          ingredients
          directions
          image
        }
      }
      result
    }
  }
`
