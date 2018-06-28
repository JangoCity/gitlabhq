module QA
  module Factory
    module Resource
      class File < Factory::Base
        attr_accessor :name,
                      :content,
                      :commit_message

        dependency Factory::Resource::Project, as: :project do |project|
          project.name = 'project-with-new-file'
        end


        def initialize
          @name = 'QA Test - File name'
          @content = 'QA Test - File content'
          @commit_message = 'QA Test - Commit message'
        end


        def fabricate!
          project.visit!

          Page::Project::Show.act {create_new_file}

          Page::File::New.perform do |page|
            page.add_name_of_file(@name)
            page.add_file_content(@content)
            page.add_commit_message(@commit_message)
            page.commit_changes
          end
        end
      end
    end
  end
end
