export type Json = string | number | boolean | null | { [key: string]: Json | undefined } | Json[]

export type Database = {
  graphql_public: {
    Tables: {
      [_ in never]: never
    }
    Views: {
      [_ in never]: never
    }
    Functions: {
      graphql: {
        Args: {
          extensions?: Json
          operationName?: string
          query?: string
          variables?: Json
        }
        Returns: Json
      }
    }
    Enums: {
      [_ in never]: never
    }
    CompositeTypes: {
      [_ in never]: never
    }
  }
  public: {
    Tables: {
      matches: {
        Row: {
          away_score: number | null
          away_score_ht: number | null
          away_team_id: number
          competition: string
          created_at: string | null
          elapsed_minutes: number | null
          external_id: number
          home_score: number | null
          home_score_ht: number | null
          home_team_id: number
          id: string
          kickoff_at: string
          raw_data: Json | null
          referee: string | null
          round: string | null
          season: number
          status: string
          updated_at: string | null
          venue: string | null
        }
        Insert: {
          away_score?: number | null
          away_score_ht?: number | null
          away_team_id: number
          competition: string
          created_at?: string | null
          elapsed_minutes?: number | null
          external_id: number
          home_score?: number | null
          home_score_ht?: number | null
          home_team_id: number
          id?: string
          kickoff_at: string
          raw_data?: Json | null
          referee?: string | null
          round?: string | null
          season: number
          status: string
          updated_at?: string | null
          venue?: string | null
        }
        Update: {
          away_score?: number | null
          away_score_ht?: number | null
          away_team_id?: number
          competition?: string
          created_at?: string | null
          elapsed_minutes?: number | null
          external_id?: number
          home_score?: number | null
          home_score_ht?: number | null
          home_team_id?: number
          id?: string
          kickoff_at?: string
          raw_data?: Json | null
          referee?: string | null
          round?: string | null
          season?: number
          status?: string
          updated_at?: string | null
          venue?: string | null
        }
        Relationships: []
      }
      news_articles: {
        Row: {
          competition: string | null
          content: string | null
          content_en: string | null
          created_at: string | null
          description: string | null
          description_en: string | null
          external_id: string | null
          fetched_at: string | null
          id: string
          image_url: string | null
          is_active: boolean | null
          language: string | null
          published_at: string
          source_name: string
          source_url: string
          team_tags: number[] | null
          title: string
          title_en: string | null
        }
        Insert: {
          competition?: string | null
          content?: string | null
          content_en?: string | null
          created_at?: string | null
          description?: string | null
          description_en?: string | null
          external_id?: string | null
          fetched_at?: string | null
          id?: string
          image_url?: string | null
          is_active?: boolean | null
          language?: string | null
          published_at: string
          source_name: string
          source_url: string
          team_tags?: number[] | null
          title: string
          title_en?: string | null
        }
        Update: {
          competition?: string | null
          content?: string | null
          content_en?: string | null
          created_at?: string | null
          description?: string | null
          description_en?: string | null
          external_id?: string | null
          fetched_at?: string | null
          id?: string
          image_url?: string | null
          is_active?: boolean | null
          language?: string | null
          published_at?: string
          source_name?: string
          source_url?: string
          team_tags?: number[] | null
          title?: string
          title_en?: string | null
        }
        Relationships: []
      }
      standings: {
        Row: {
          competition: string
          drawn: number | null
          form: string | null
          goal_difference: number | null
          goals_against: number | null
          goals_for: number | null
          id: string
          lost: number | null
          played: number | null
          points: number
          position: number
          season: number
          team_external_id: number
          updated_at: string | null
          won: number | null
        }
        Insert: {
          competition: string
          drawn?: number | null
          form?: string | null
          goal_difference?: number | null
          goals_against?: number | null
          goals_for?: number | null
          id?: string
          lost?: number | null
          played?: number | null
          points?: number
          position: number
          season: number
          team_external_id: number
          updated_at?: string | null
          won?: number | null
        }
        Update: {
          competition?: string
          drawn?: number | null
          form?: string | null
          goal_difference?: number | null
          goals_against?: number | null
          goals_for?: number | null
          id?: string
          lost?: number | null
          played?: number | null
          points?: number
          position?: number
          season?: number
          team_external_id?: number
          updated_at?: string | null
          won?: number | null
        }
        Relationships: []
      }
      teams: {
        Row: {
          badge_url: string | null
          city: string | null
          competition: string
          created_at: string | null
          external_id: number
          id: string
          name: string
          name_en: string | null
          short_name: string
          updated_at: string | null
        }
        Insert: {
          badge_url?: string | null
          city?: string | null
          competition: string
          created_at?: string | null
          external_id: number
          id?: string
          name: string
          name_en?: string | null
          short_name: string
          updated_at?: string | null
        }
        Update: {
          badge_url?: string | null
          city?: string | null
          competition?: string
          created_at?: string | null
          external_id?: number
          id?: string
          name?: string
          name_en?: string | null
          short_name?: string
          updated_at?: string | null
        }
        Relationships: []
      }
      user_preferences: {
        Row: {
          created_at: string | null
          favorite_team_ids: number[] | null
          id: string
          language: string | null
          updated_at: string | null
          user_id: string
        }
        Insert: {
          created_at?: string | null
          favorite_team_ids?: number[] | null
          id?: string
          language?: string | null
          updated_at?: string | null
          user_id: string
        }
        Update: {
          created_at?: string | null
          favorite_team_ids?: number[] | null
          id?: string
          language?: string | null
          updated_at?: string | null
          user_id?: string
        }
        Relationships: []
      }
    }
    Views: {
      [_ in never]: never
    }
    Functions: {
      [_ in never]: never
    }
    Enums: {
      [_ in never]: never
    }
    CompositeTypes: {
      [_ in never]: never
    }
  }
}

type DatabaseWithoutInternals = Omit<Database, '__InternalSupabase'>

type DefaultSchema = DatabaseWithoutInternals[Extract<keyof Database, 'public'>]

export type Tables<
  DefaultSchemaTableNameOrOptions extends
    | keyof (DefaultSchema['Tables'] & DefaultSchema['Views'])
    | { schema: keyof DatabaseWithoutInternals },
  TableName extends DefaultSchemaTableNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
    ? keyof (DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions['schema']]['Tables'] &
        DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions['schema']]['Views'])
    : never = never,
> = DefaultSchemaTableNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals
}
  ? (DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions['schema']]['Tables'] &
      DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions['schema']]['Views'])[TableName] extends {
      Row: infer R
    }
    ? R
    : never
  : DefaultSchemaTableNameOrOptions extends keyof (DefaultSchema['Tables'] & DefaultSchema['Views'])
    ? (DefaultSchema['Tables'] & DefaultSchema['Views'])[DefaultSchemaTableNameOrOptions] extends {
        Row: infer R
      }
      ? R
      : never
    : never

export type TablesInsert<
  DefaultSchemaTableNameOrOptions extends keyof DefaultSchema['Tables'] | { schema: keyof DatabaseWithoutInternals },
  TableName extends DefaultSchemaTableNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
    ? keyof DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions['schema']]['Tables']
    : never = never,
> = DefaultSchemaTableNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals
}
  ? DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions['schema']]['Tables'][TableName] extends {
      Insert: infer I
    }
    ? I
    : never
  : DefaultSchemaTableNameOrOptions extends keyof DefaultSchema['Tables']
    ? DefaultSchema['Tables'][DefaultSchemaTableNameOrOptions] extends {
        Insert: infer I
      }
      ? I
      : never
    : never

export type TablesUpdate<
  DefaultSchemaTableNameOrOptions extends keyof DefaultSchema['Tables'] | { schema: keyof DatabaseWithoutInternals },
  TableName extends DefaultSchemaTableNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
    ? keyof DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions['schema']]['Tables']
    : never = never,
> = DefaultSchemaTableNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals
}
  ? DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions['schema']]['Tables'][TableName] extends {
      Update: infer U
    }
    ? U
    : never
  : DefaultSchemaTableNameOrOptions extends keyof DefaultSchema['Tables']
    ? DefaultSchema['Tables'][DefaultSchemaTableNameOrOptions] extends {
        Update: infer U
      }
      ? U
      : never
    : never

export type Enums<
  DefaultSchemaEnumNameOrOptions extends keyof DefaultSchema['Enums'] | { schema: keyof DatabaseWithoutInternals },
  EnumName extends DefaultSchemaEnumNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
    ? keyof DatabaseWithoutInternals[DefaultSchemaEnumNameOrOptions['schema']]['Enums']
    : never = never,
> = DefaultSchemaEnumNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals
}
  ? DatabaseWithoutInternals[DefaultSchemaEnumNameOrOptions['schema']]['Enums'][EnumName]
  : DefaultSchemaEnumNameOrOptions extends keyof DefaultSchema['Enums']
    ? DefaultSchema['Enums'][DefaultSchemaEnumNameOrOptions]
    : never

export type CompositeTypes<
  PublicCompositeTypeNameOrOptions extends
    | keyof DefaultSchema['CompositeTypes']
    | { schema: keyof DatabaseWithoutInternals },
  CompositeTypeName extends PublicCompositeTypeNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
    ? keyof DatabaseWithoutInternals[PublicCompositeTypeNameOrOptions['schema']]['CompositeTypes']
    : never = never,
> = PublicCompositeTypeNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals
}
  ? DatabaseWithoutInternals[PublicCompositeTypeNameOrOptions['schema']]['CompositeTypes'][CompositeTypeName]
  : PublicCompositeTypeNameOrOptions extends keyof DefaultSchema['CompositeTypes']
    ? DefaultSchema['CompositeTypes'][PublicCompositeTypeNameOrOptions]
    : never

export const Constants = {
  graphql_public: {
    Enums: {},
  },
  public: {
    Enums: {},
  },
} as const
